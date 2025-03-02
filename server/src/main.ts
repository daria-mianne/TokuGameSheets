import cors from 'cors';
import express, { Request, Response } from 'express';
import { InvitationsController } from '@controllers';
import { connection } from '@models';

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

// Invitations routes
app.get('/api/v0/invitations', async (_: Request, res: Response) => {
    try {
        const invitations = await InvitationsController.list();
        res.status(200).json(invitations);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

app.get('/api/v0/invitations/:guid', async (req: Request, res: Response) => {
    try {
        const { guid } = req.params;
        const invitation = await InvitationsController.findByGuid(guid);
        if (invitation) {
            res.status(200).json(invitation);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

app.post('/api/v0/invitations', async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const invitation = await InvitationsController.create(Number(userId));
        res.status(200).json(invitation);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

app.delete('/api/v0/invitations/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const invitation = await InvitationsController.find(Number(id));
        if (invitation) {
            await invitation.destroy();
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Health check
app.get('/api/healthcheck', (_, res) => {
    // TODO: actually perform a healthcheck
    res.status(200).json({ message: 'Healthy' });
});

// Default handler
app.get('*', (_, res) => {
    res.status(400).send();
});

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
