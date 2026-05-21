const http = require('http');
const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
const PORT      = 3000;
const DIR       = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return { entries: [] };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function json(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // ── API ──────────────────────────────────────────────────────────────────
  if (url.pathname === '/api/entries') {

    if (req.method === 'GET') {
      json(res, 200, readData().entries);
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const entry = JSON.parse(body);
          const data  = readData();
          data.entries.unshift(entry);
          writeData(data);
          json(res, 200, data.entries);
        } catch {
          json(res, 400, { error: 'Invalid JSON' });
        }
      });
      return;
    }

    if (req.method === 'DELETE') {
      const id   = url.searchParams.get('id');
      const data = readData();
      data.entries = data.entries.filter(e => String(e.id) !== id);
      writeData(data);
      json(res, 200, data.entries);
      return;
    }
  }

  // ── Static files ─────────────────────────────────────────────────────────
  let filePath = url.pathname === '/' ? '/index.html' : url.pathname;
  filePath = path.join(DIR, filePath);

  // Prevent directory traversal
  if (!filePath.startsWith(DIR)) {
    res.writeHead(403); res.end(); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  I'm fine  →  http://localhost:${PORT}\n`);
});
