// Next.js
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

// Themes
import { ThemeProvider } from '@/contexts/themeContext';

// List of routes to disable heavy contexts for
const routesNoContext = ['/400', '/403', '/404', '/429', '/500', '/503'];

const routesIncludesPath = (route: string, routes: string[]): boolean => {
  return routes.includes(route);
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const ignoreHeavyContexts = routesIncludesPath(router.route, routesNoContext);

  if (ignoreHeavyContexts) {
    return (
      <>
        <Head>
          <meta
            id="meta-description"
            name="description"
            content="Next.js Boilerplate"
          />
          <meta
            id="og-title"
            property="og:title"
            content="Next.js Boilerplate"
          />
          <meta
            id="og-image"
            property="og:image"
            content="https://example.com/static/imgs/og-image.png"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@example" />
          <meta name="twitter:title" content="Next.js Boilerplate" />
          <meta name="twitter:description" content="Next.js Boilerplate" />
          <meta
            name="twitter:image"
            content="https://example.com/static/imgs/og-image.png"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <main>
          <Component {...pageProps} />
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <meta
          id="meta-description"
          name="description"
          content="Next.js Boilerplate"
        />
        <meta id="og-title" property="og:title" content="Next.js Boilerplate" />
        <meta
          id="og-image"
          property="og:image"
          content="https://example.com/static/imgs/og-image.png"
        />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@example" />
        <meta name="twitter:title" content="Next.js Boilerplate" />
        <meta name="twitter:description" content="Next.js Boilerplate" />
        <meta
          name="twitter:image"
          content="https://example.com/static/imgs/og-image.png"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
    </>
  );
}
