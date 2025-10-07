# Sentry Setup (Optional)

This project includes an optional Sentry client initializer. It will only run if VITE_SENTRY_DSN is provided at build/runtime.

1) Install dependencies
- Already added to package.json: @sentry/react
- Install packages:
  npm install

2) Configure environment variables
- Create .env (for local) or .env.production (for build) and add:
  VITE_SENTRY_DSN=https://<public_key>@o<org_id>.ingest.sentry.io/<project_id>

3) How it works
- src/sentry.client.js initializes Sentry only when VITE_SENTRY_DSN is present
- src/main.jsx conditionally loads sentry.client.js
- No DSN → no Sentry code runs

4) Verify
- Run the app with DSN configured, trigger an error, and check Sentry dashboard

5) (Optional) Source maps upload in CI
- If you want to upload source maps, add @sentry/vite-plugin and configure Vite:
  npm i -D @sentry/vite-plugin
- In vite.config.js, conditionally add the plugin when env vars are set:
  import { sentryVitePlugin } from '@sentry/vite-plugin'
  const enableSentry = process.env.SENTRY_AUTH_TOKEN && process.env.SENTRY_ORG && process.env.SENTRY_PROJECT
  export default defineConfig({
    plugins: [
      // ...existing plugins,
      enableSentry && sentryVitePlugin({
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        authToken: process.env.SENTRY_AUTH_TOKEN,
      })
    ].filter(Boolean)
  })
- In your CI, add secrets:
  SENTRY_AUTH_TOKEN, SENTRY_ORG, SENTRY_PROJECT

Notes
- Do not commit secrets. Use repository secrets or environment variables in CI.
- Keep sampling rates (traces/replays) conservative and environment-aware.
