import { Express, Request, Response } from 'express';
import { InvitationsController } from '@controllers';
import { addRoute } from '@util/utilfunctions';

export const initInvitationRoutes = (app: Express) => {
    addRoute(app, 'get', 'v0', 'invitations', async (_: Request, res: Response) => {
        const invitations = await InvitationsController.list();
        res.status(200).json(invitations);
    });

    addRoute(app, 'get', 'v0', 'invitations/:guid', async (req: Request, res: Response) => {
        const { guid } = req.params;
        const invitation = await InvitationsController.findByGuid(guid);
        if (invitation) {
            res.status(200).json(invitation);
        } else {
            res.status(404).send();
        }
    });

    addRoute(app, 'post', 'v0', 'invitations', async (req: Request, res: Response) => {
        const { userId, forAdmin } = req.body;
        // TODO: also get recipient from the request body and send an email with the invitation link to that address
        const invitation = await InvitationsController.create(Number(userId), Boolean(forAdmin));
        res.status(200).json(invitation);
    });

    addRoute(app, 'delete', 'v0', 'invitations/:id', async (req: Request, res: Response) => {
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
};
