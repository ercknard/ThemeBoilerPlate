import type { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_API = 'https://api.github.com';
const GITHUB_API_VERSION = '2022-11-28';

type GitHubEvent = {
  id: string;
  type: string;
  actor: {
    id: number;
    login: string;
    display_login?: string;
    avatar_url: string;
    html_url?: string;
  };
  repo: {
    id: number;
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    master_branch?: string;
    description?: string | null;
    before?: string;
    head?: string;
    commits?: unknown[];
    [key: string]: unknown;
  };
  public: boolean;
  created_at: string;
};

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
    ...(token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {})
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);

    return res.status(405).json({
      error: 'Method Not Allowed'
    });
  }

  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return res.status(500).json({
      error: 'GITHUB_REPOSITORY is not configured'
    });
  }

  const [owner, repo] = repository.split('/');

  if (!owner || !repo) {
    return res.status(500).json({
      error: 'GITHUB_REPOSITORY must use the format owner/repository'
    });
  }

  try {
    const perPage = Math.min(
      Math.max(Number(req.query.per_page) || 30, 1),
      100
    );

    const eventsUrl = new URL(
      `${GITHUB_API}/repos/${encodeURIComponent(
        owner
      )}/${encodeURIComponent(repo)}/events`
    );

    eventsUrl.searchParams.set('per_page', String(perPage));

    const eventsResponse = await fetch(eventsUrl.toString(), {
      headers: githubHeaders()
    });

    const eventsData = await eventsResponse.json();

    if (!eventsResponse.ok) {
      return res.status(eventsResponse.status).json({
        error: eventsData?.message || 'GitHub events request failed',
        status: eventsResponse.status
      });
    }

    const events: GitHubEvent[] = Array.isArray(eventsData) ? eventsData : [];

    /*
     * GitHub's repository events may not provide the complete
     * commit information we want for a PushEvent.
     *
     * For each push, fetch the commits between `before` and
     * `head` so the frontend gets real commit data.
     */
    const enrichedEvents = await Promise.all(
      events.map(async (event) => {
        if (event.type !== 'PushEvent' || !event.payload?.head) {
          return event;
        }

        const branch = event.payload.ref?.replace('refs/heads/', '');

        if (!branch) {
          return event;
        }

        try {
          /*
           * Use the compare endpoint when we know both SHAs.
           *
           * This gives us the commits introduced by this push.
           */
          if (
            event.payload.before &&
            event.payload.before !== '0000000000000000000000000000000000000000'
          ) {
            const compareUrl = `${GITHUB_API}/repos/${encodeURIComponent(
              owner
            )}/${encodeURIComponent(
              repo
            )}/compare/${event.payload.before}...${event.payload.head}`;

            const compareResponse = await fetch(compareUrl, {
              headers: githubHeaders()
            });

            if (compareResponse.ok) {
              const compareData = await compareResponse.json();

              if (Array.isArray(compareData.commits)) {
                return {
                  ...event,
                  payload: {
                    ...event.payload,
                    commits: compareData.commits.map((commit: any) => ({
                      sha: commit.sha,
                      message: commit.commit?.message || commit.message || '',
                      author: {
                        name: commit.commit?.author?.name,
                        email: commit.commit?.author?.email
                      },
                      distinct: true,
                      url:
                        commit.html_url ||
                        `https://github.com/${owner}/${repo}/commit/${commit.sha}`
                    }))
                  }
                };
              }
            }
          }

          /*
           * Fallback: fetch commits for the branch.
           */
          const commitsUrl = `${GITHUB_API}/repos/${encodeURIComponent(
            owner
          )}/${encodeURIComponent(
            repo
          )}/commits?sha=${encodeURIComponent(branch)}&per_page=20`;

          const commitsResponse = await fetch(commitsUrl, {
            headers: githubHeaders()
          });

          if (commitsResponse.ok) {
            const commitsData = await commitsResponse.json();

            if (Array.isArray(commitsData)) {
              return {
                ...event,
                payload: {
                  ...event.payload,
                  commits: commitsData.map((commit: any) => ({
                    sha: commit.sha,
                    message: commit.commit?.message || commit.message || '',
                    author: {
                      name: commit.commit?.author?.name,
                      email: commit.commit?.author?.email
                    },
                    distinct: true,
                    url:
                      commit.html_url ||
                      `https://github.com/${owner}/${repo}/commit/${commit.sha}`
                  }))
                }
              };
            }
          }
        } catch (error) {
          console.error(`Failed to enrich push event ${event.id}:`, error);
        }

        return event;
      })
    );

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return res.status(200).json(enrichedEvents);
  } catch (error) {
    console.error('GitHub events error:', error);

    return res.status(500).json({
      error: 'Failed to fetch GitHub events'
    });
  }
}
