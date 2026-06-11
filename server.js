require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

// Build injects PORT at runtime; the web process must listen on it.
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const startedAt = new Date();

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

app.get('/', (req, res) => {
  res.render('index', {
    greeting: process.env.GREETING || 'Hello from Build!',
    env: {
      nodeEnv: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      port: PORT,
      dyno: process.env.DYNO || 'local',
    },
  });
});

// ---------------------------------------------------------------------------
// API — a tiny JSON endpoint to demo with curl or fetch()
// ---------------------------------------------------------------------------

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    uptimeSeconds: Math.floor(process.uptime()),
    startedAt: startedAt.toISOString(),
    node: process.version,
  });
});

app.get('/api/greeting', (req, res) => {
  res.json({
    // Change GREETING in your app's config vars and watch this update —
    // no redeploy needed:  bld config:set GREETING="Hi team" -a <your-app>
    greeting: process.env.GREETING || 'Hello from Build!',
  });
});

// ---------------------------------------------------------------------------
// Try it: add your own route here, push to GitHub, and redeploy.
// ---------------------------------------------------------------------------
// app.get('/yourname', (req, res) => {
//   res.send('This page was added by <yourname>!');
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
