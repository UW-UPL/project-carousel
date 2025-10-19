const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3005;

// Path to test slides directory
const testSlidesPath = path.join(__dirname, '/slides');

// Enable CORS
app.use(cors());

app.use('/slides', express.static(testSlidesPath));

// Add network latency simulation
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Simulate network delay (500ms-1000ms)
  const delay = Math.random() * 500 + 500;
  setTimeout(() => {
    next();
  }, delay);
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
  console.log(`Slides available at: http://localhost:${PORT}/slides/`);
  console.log(`Test with: http://localhost:${PORT}/slides/index.txt`);
});
