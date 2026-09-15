import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');

    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  const repository = process.env.GITHUB_REPOSITORY;

  if (!repository) {
    return res.status(500).json({
      error: 'GITHUB_REPOSITORY is not configured.'
    });
  }

  const [owner, repo] = repository.split('/');

  if (!owner || !repo) {
    return res.status(500).json({
      error: 'GITHUB_REPOSITORY must use the format owner/repository.'
    });
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${encodeURIComponent(
        owner
      )}/${encodeURIComponent(repo)}`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2026-03-10',
          'User-Agent': 'CryptechServices'
        }
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.message || `GitHub API returned status ${response.status}.`
      });
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return res.status(200).json(data);
  } catch (error) {
    console.error('GitHub repository error:', error);

    return res.status(500).json({
      error: 'Unable to fetch GitHub repository.'
    });
  }
}
