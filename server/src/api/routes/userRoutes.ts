import { InvitationsController, UsersController } from '@controllers';
import { Express, Request, Response } from 'express';
import { SessionToken } from '@models/SessionToken';

export const initUserRoutes = (app: Express) => {
    // TODO: more routes
    app.get('/api/v0/users/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await UsersController.find(Number(id));
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });

    app.get('/api/v0/users/:id/isAdmin', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await UsersController.find(Number(id));
            if (user) {
                res.status(200).json(user.isAdmin);
            } else {
                res.status(404).send();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });

    app.post('/api/v0/signup', async (req: Request, res: Response) => {
        const { inviteToken, username, displayName, password, recoveryEmail, isAdmin } = req.body;

        const invitation = await InvitationsController.findByGuid(inviteToken);
        if (!invitation) {
            res.status(401).send({ message: 'invalid token' });
            return;
        }

        try {
            const { id } = await UsersController.create(username, password, isAdmin, displayName, recoveryEmail);
            res.status(200).json({ id });
            invitation.destroy();
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });

    app.post('/api/v0/login', async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!username || !password) {
            // No requests with empty username/password
            res.status(400).send();
            return;
        }

        try {
            const user = await UsersController.findByName(username);
            if (user) {
                if (await user.validPassword(password)) {
                    const token = crypto.randomUUID();
                    SessionToken.create({
                        userId: user.id,
                        token,
                    });
                    res.status(200).json({
                        token,
                    });
                    return;
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
            return;
        }

        res.status(401).send();
    });

    app.post('/api/v0/restoreSession', async (req: Request, res: Response) => {
        const { token } = req.body;
        if (token && (await SessionToken.validToken(token))) {
            res.status(200).send();
            return;
        }

        res.status(401).send();
    });
};
