const express = require('express');
const path = require('node:path');
const projects = require('./data/projects');

const app = express();
const tagId = process.env.GOOGLE_TAG_ID || '';

if (tagId && !/^(?:G|GT|AW)-[A-Z0-9]+$/.test(tagId)) {
  throw new Error('GOOGLE_TAG_ID must be a Google tag ID, such as G-XXXXXXXXXX');
}

app.disable('x-powered-by');
// API endpoints
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/config', (req, res) => {
  res.json({ tagId });
});

const clientBuild = path.join(__dirname, 'client', 'dist');

// The React/Vite production build owns every non-API route.
app.use(express.static(clientBuild));
app.get('{*splat}', (req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'));
});

module.exports = app;
