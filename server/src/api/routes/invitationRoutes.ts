import { Express, Request, Response } from 'express';
import { InvitationsController } from '@controllers';

export const initInvitationRoutes = (app: Express) => {
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
            const { userId, forAdmin } = req.body;
            const invitation = await InvitationsController.create(Number(userId), Boolean(forAdmin));
            res.status(200).json({ invitation });
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });

    app.delete('/api/v0/invitations/:id', async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const invitation = await InvitationsController.delete(Number(id));
            if (invitation) {
                // got back the deleted invitation
                res.status(200).send();
            } else {
                // got back null, representing an absent record
                res.status(404).send();
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
};
