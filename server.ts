import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import https from 'https';

const privateKey = fs.readFileSync('ssl/server.key', 'utf8');
const certificate = fs.readFileSync('ssl/server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const __dirname = import.meta.dirname;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/hello', (_, res) => {
    res.json({ message: 'Hello, world!' });
});

// Default handler
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen for HTTP traffic
const httpPort = process.env.HTTP_PORT || 5000;
const httpServer = http.createServer(app);
httpServer.listen(httpPort);

// Listen for HTTPS traffic
const httpsPort = process.env.HTTPS_PORT || 5080;
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(httpsPort);
