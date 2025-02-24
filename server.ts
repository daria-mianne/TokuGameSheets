import express from 'express';
import path from 'path';

const app = express();
const __dirname = import.meta.dirname;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/v0/hello', (_, res) => {
    res.json({ message: 'Hello, world!' });
});

// Default handler
app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});