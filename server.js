const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files from project root
app.use(express.static(__dirname));
app.use(express.json());

// In-memory store for wishes
let wishes = [];
let wishIdCounter = 1;
let onlineCount = 0;

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// REST endpoint to get all wishes
app.get('/api/wishes', (req, res) => {
  res.json(wishes);
});

// WebSocket connection handler
wss.on('connection', (ws, req) => {
  onlineCount++;
  console.log(`Client connected. Online: ${onlineCount}`);

  // Send welcome data
  ws.send(JSON.stringify({
    type: 'init',
    wishes: wishes,
    onlineCount: onlineCount
  }));

  // Broadcast updated online count
  broadcast({ type: 'onlineCount', count: onlineCount });

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);

      if (msg.type === 'wish') {
        const wish = {
          id: wishIdCounter++,
          name: sanitize(msg.name || 'Ẩn danh'),
          message: sanitize(msg.message || ''),
          emoji: msg.emoji || '💕',
          timestamp: new Date().toISOString()
        };
        wishes.unshift(wish);
        // Keep only last 100 wishes
        if (wishes.length > 100) wishes = wishes.slice(0, 100);

        // Broadcast new wish to all clients
        broadcast({ type: 'newWish', wish });
      }

      if (msg.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
      }

    } catch (e) {
      console.error('Parse error:', e);
    }
  });

  ws.on('close', () => {
    onlineCount = Math.max(0, onlineCount - 1);
    console.log(`Client disconnected. Online: ${onlineCount}`);
    broadcast({ type: 'onlineCount', count: onlineCount });
  });

  ws.on('error', (err) => {
    console.error('WS error:', err);
  });
});

function broadcast(data) {
  const msg = JSON.stringify(data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg);
    }
  });
}

function sanitize(str) {
  return String(str).substring(0, 300)
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🌸 Thiệp cưới Xuân Anh & Thuỳ Linh đang chạy tại:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`\nMở trình duyệt và truy cập địa chỉ trên!\n`);
});
