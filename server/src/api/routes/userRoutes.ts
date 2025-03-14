import { InvitationsController, UsersController } from '@controllers';
import { Express, Request, Response } from 'express';
import { SessionToken } from '@models/SessionToken';
import { addRoute } from '@util/utilfunctions';
import { User } from '@models';
import { sha256 } from '@util/hashing';
import { pick } from 'lodash';

const limitUserData = (user: User | null) => {
    if (user === null) return null;
    return pick(user, [
        'id',
        'username',
        'displayName',
        'recoveryEmail',
        'isAdmin',
        'createdAt',
        'updatedAt',
        'deletedAt',
    ]);
};

export const initUserRoutes = (app: Express) => {
    addRoute(app, 'get', 'v0', 'users/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UsersController.find(Number(id));
        if (user) {
            res.status(200).json(limitUserData(user));
        } else {
            res.status(404).send();
        }
    });

    addRoute(app, 'get', 'v0', 'users/:id/isAdmin', async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = await UsersController.find(Number(id));
        if (user) {
            res.status(200).json(user.isAdmin);
        } else {
            res.status(404).send();
        }
    });

    addRoute(app, 'post', 'v0', 'signup', async (req: Request, res: Response) => {
        const { inviteToken, username, displayName, password, recoveryEmail, isAdmin } = req.body;

        const invitation = await InvitationsController.findByGuid(inviteToken);
        if (!invitation) {
            res.status(401).send({ message: 'invalid token' });
            return;
        }

        const { id } = await UsersController.create(username, password, isAdmin, displayName, recoveryEmail);
        res.status(200).json({ id });
        invitation.destroy();
    });

    addRoute(app, 'post', 'v0', 'login', async (req: Request, res: Response) => {
        const { username, password } = req.body;
        if (!username || !password) {
            // No requests with empty username/password
            res.status(400).send();
            return;
        }

        const user = await UsersController.findByName(username);
        if (user) {
            if (await user.validPassword(password)) {
                const token = crypto.randomUUID();
                await SessionToken.create({
                    userId: user.id,
                    token,
                });
                res.status(200).json({
                    token,
                    user: limitUserData(user),
                });
                return;
            }
        }

        res.status(401).send();
    });

    addRoute(app, 'post', 'v0', 'logout', async (req: Request, res: Response) => {
        const { token } = req.body as { token: string };
        const hashedToken = await sha256(token);
        const sessionToken = await SessionToken.findOne({
            where: {
                token: hashedToken,
            },
        });
        if (!sessionToken) {
            res.status(404).send();
            return;
        }

        await sessionToken.destroy();
        res.status(200).send();
    });

    addRoute(app, 'post', 'v0', 'restoreSession', async (req: Request, res: Response) => {
        const { token } = req.body as { token: string };
        const hashedToken = await sha256(token);
        const sessionToken = await SessionToken.findOne({
            where: {
                token: hashedToken, // FIXME
            },
        });
        if (!sessionToken) {
            res.status(401).send();
            return;
        }

        const user = await User.findByPk(sessionToken.userId);
        res.status(200).json(limitUserData(user));
    });
};
