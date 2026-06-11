# Getting Started with Node.js on Build

A barebones Node.js app using [Express](https://expressjs.com/) and EJS templates, ready to deploy to [Build](https://build.io).

Use it as a starting point for your own app, or as a sandbox to learn the Build deployment workflow: buildpacks, Procfiles, config vars, and automatic deploys.

## What's inside

```
.
├── Procfile            # Tells Build how to start the web process
├── server.js           # Express app — routes and API endpoints
├── views/index.ejs     # Landing page template
├── public/css/         # Static assets
├── .env.example        # Sample local config (copy to .env)
└── Dockerfile          # Optional: for the "dockerfile" stack
```

## Run it locally

You'll need Node.js 22 or later.

```sh
git clone https://github.com/<your-org>/node-getting-started.git
cd node-getting-started
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The `dev` script restarts the server when you edit files.

## Deploy to Build

Build deploys directly from GitHub, so first push this repository to your account:

```sh
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<you>/node-getting-started.git
git push -u origin main
```

Then, in the [Build dashboard](https://build.io):

1. **Create an app** — click **New + → New App**, give it a name, and pick a region.
2. **Check the stack** — in **Settings**, the default stack with the Node.js buildpack auto-detected from `package.json` works out of the box. (Optionally add `https://github.com/heroku/heroku-buildpack-nodejs` explicitly.)
3. **Connect GitHub** — in **Deploy → Connection**, select your organisation and connect this repository.
4. **Deploy** — in **Deploy → Manual Deploy**, choose `main` and click **Deploy Branch**. Watch the build run, then click **Go** on the Overview tab to open your live app.

For continuous deployment, enable **Automatic Deploys** on the Deploy tab — every push to `main` then triggers a new build.

## Play with config vars

The landing page greeting is read from the `GREETING` environment variable. Change it with the [Build CLI](https://build.io/docs/guides/cli) — no redeploy needed:

```sh
brew install buildio/cli/bld
bld login
bld config:set GREETING="こんにちは, Build!" -a <your-app>
```

Refresh the page or hit the API:

```sh
curl https://<your-app>.build.io/api/greeting
```

## How it works

- **Procfile** — declares the web process: `web: npm start`. Build's router sends HTTP traffic only to `web` processes.
- **`$PORT`** — Build injects the port at runtime; `server.js` reads `process.env.PORT`. Never hardcode a port.
- **Config vars** — settings live in the environment, not in code (twelve-factor style). Locally, `dotenv` loads them from `.env`, which stays out of git.

## Optional: deploy as a container

Prefer Docker? A `Dockerfile` is included. In **Settings → Stack**, select `dockerfile`, then deploy as normal — Build builds the image and runs it instead of using buildpacks.

## Endpoints

| Path | Description |
|------|-------------|
| `/` | Landing page with runtime info |
| `/api/status` | JSON health/uptime endpoint |
| `/api/greeting` | Returns the `GREETING` config var |

## Next steps

- Uncomment the sample route at the bottom of `server.js` and redeploy.
- Add a `worker:` process to the Procfile for background jobs.
- Attach a database from the dashboard — see [Databases & Add-ons](https://build.io/docs/guides/databases-and-addons).
