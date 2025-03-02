import cors from 'cors';
import express, { Request, Response } from 'express';
import { connection } from '@models';
import { initAllRoutes } from '@routes';
import { initAllJobs } from '@jobs';

// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!
// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!
// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!
// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!
// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!
// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!
// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!
// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!
// FIXME: AUTH! ADD IT! ADD THE AUTH! YOU CAN'T LAUNCH LITERALLY ANYTHING WITHOUT AUTH!

// TODO: Params/body validation throughout

const app = express();

// Register middlewares
app.use(cors({ origin: 'http://localhost:5432' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes (TODO: Move these route definitions to routes.ts)
app.get('/api/v0/hello', (_: Request, res: Response) => {
    res.status(200).json({ message: 'Hello, world!' });
});

initAllRoutes(app);

// Health check
app.get('/api/healthcheck', (_, res) => {
    // TODO: actually perform a healthcheck
    res.status(200).json({ message: 'Healthy' });
});

// Default handler
app.get('*', (_, res) => {
    res.status(400).send();
});

initAllJobs();

// Start the server
const port = process.env.PORT || 5000;
const start = async (): Promise<void> => {
    try {
        await connection.authenticate();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    try {
        await connection.sync();
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(2);
    }
};
void start();
