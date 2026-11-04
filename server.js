const express = require('express');
const path = require('node:path');
const projects = require('./data/projects');

const app = express();
const port = Number(process.env.PORT || 3000);
const tagId = process.env.GOOGLE_TAG_ID || '';

if (tagId && !/^(?:G|GT|AW)-[A-Z0-9]+$/.test(tagId)) {
  throw new Error('GOOGLE_TAG_ID must be a Google tag ID, such as G-XXXXXXXXXX');
}

app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

for (const directory of ['css', 'img', 'js']) {
  app.use(`/${directory}`, express.static(path.join(__dirname, directory)));
}

app.get('/', (req, res) => {
  res.render('index', { projects, tagId });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio listening on port ${port}`);
});
