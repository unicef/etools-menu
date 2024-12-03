const express = require('express'); // eslint-disable-line
const compression = require('compression'); // eslint-disable-line
const browserCapabilities = require('browser-capabilities'); // eslint-disable-line

const app = express();
const basedir = __dirname + '/src/'; // eslint-disable-line

app.use(compression());

function getSourcesPath(request) {
  let clientCapabilities = browserCapabilities.browserCapabilities(request.headers['user-agent']);

  clientCapabilities = new Set(clientCapabilities); // eslint-disable-line
  if (clientCapabilities.has('modules')) {
    return basedir;
  } else {
    return basedir;
  }
}

app.use('/menu/', (req, res, next) => {
  express.static(getSourcesPath(req))(req, res, next);
});

app.get(/.*service-worker\.js/, function (req, res) {
  res.sendFile(getSourcesPath(req) + 'service-worker.js');
});

app.use((req, res) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  res.sendFile(getSourcesPath(req) + 'index.html');
});

app.listen(8080);
