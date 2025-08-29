// index.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// optional index/landing page (if you have a views/index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// WHOAMI endpoint
app.get('/api/whoami', (req, res) => {
  // For proxied environments (Replit/Glitch/Heroku) use x-forwarded-for
  const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip || '')
              .split(',')[0].trim();

  // Accept-Language header; return the first preference
  const language = (req.headers['accept-language'] || '').split(',')[0].trim();

  // User-Agent header (software)
  const software = req.headers['user-agent'] || '';

  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

// listen
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
