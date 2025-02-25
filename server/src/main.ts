import cors from 'cors';
import express from 'express';

const app = express();

// Register middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.get('/api/v0/hello', (_, res) => {
    res.status(200).json({ message: 'Hello, world!' });
});

// Default handler
app.get('*', (_, res) => {
    res.status(400).send();
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});