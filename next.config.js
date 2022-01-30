// @ts-check

// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

const isSentryEnabled = !!process.env.SENTRY_DSN

const BUILD_ID = process.env.BUILD_ID || process.env.SENTRY_RELEASE
const BUILD_ENV =
  process.env.BUILD_ENV ||
  process.env.SENTRY_ENVIRONMENT ||
  process.env.NODE_ENV

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    outputStandalone: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  generateBuildId: async () => BUILD_ID || null,
  sentry: {
    // NOTE: re-enable check if server-side apis are written
    disableServerWebpackPlugin: /* !isSentryEnabled */ true,
    disableClientWebpackPlugin: !isSentryEnabled,
  },
  env: {
    BUILD_ID: BUILD_ID,
    BUILD_ENV: BUILD_ENV,
  },
}

/**
 * @type {Omit<import('@sentry/webpack-plugin').SentryCliPluginOptions, 'include'>}
 */
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  deploy: {
    env: BUILD_ENV || 'development',
  },
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
// @ts-ignore
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions)
