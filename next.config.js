// next.config.js
/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const hostForceHttps = process.env.HOST_FORCE_HTTPS_REQUEST === 'true';
const upgradeInsecureRequests = 'upgrade-insecure-requests;';

const cspDev = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self' http: https: ws: wss:;
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`;

const cspProd = `
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  connect-src 'self' ${process.env.NEXT_PUBLIC_EXPLORER_URI};
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  block-all-mixed-content;
  ${hostForceHttps ? upgradeInsecureRequests : ''}
`;

const nextConfig = {
  reactStrictMode: isProd,
  allowedDevOrigins: isProd ? [] : [`${process.env.NEXT_PUBLIC_FQDN}`],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: (isProd ? cspProd : cspDev).replace(/\n/g, '')
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
