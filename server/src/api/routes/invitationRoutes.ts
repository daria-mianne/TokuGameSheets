import { Express, Request, Response } from 'express';
import { InvitationsController } from '@controllers';
import { catch500 } from '@util/utilfunctions';

export const initInvitationRoutes = (app: Express) => {
    app.get('/api/v0/invitations', async (_: Request, res: Response) => {
        await catch500(res, async () => {
            const invitations = await InvitationsController.list();
            res.status(200).json(invitations);
        });
    });

    app.get('/api/v0/invitations/:guid', async (req: Request, res: Response) => {
        await catch500(res, async () => {
            const { guid } = req.params;
            const invitation = await InvitationsController.findByGuid(guid);
            if (invitation) {
                res.status(200).json(invitation);
            } else {
                res.status(404).send();
            }
        });
    });

    app.post('/api/v0/invitations', async (req: Request, res: Response) => {
        await catch500(res, async () => {
            const { userId, forAdmin } = req.body;
            // TODO: also get recipient from the request body and send an email with the invitation link to that address
            const invitation = await InvitationsController.create(Number(userId), Boolean(forAdmin));
            res.status(200).json(invitation);
        });
    });

    app.delete('/api/v0/invitations/:id', async (req: Request, res: Response) => {
        await catch500(res, async () => {
            const { id } = req.params;
            const invitation = await InvitationsController.delete(Number(id));
            if (invitation) {
                // got back the deleted invitation
                res.status(200).send();
            } else {
                // got back null, representing an absent record
                res.status(404).send();
            }
        });
    });
};
