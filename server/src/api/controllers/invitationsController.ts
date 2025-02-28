import { Invitations } from "@db/models/invitation";

export class InvitationsController {
    public static create = (req: Request, res: Response): void => {
        if (!req.json?.().inviting_user_id) {
            res.status(400).json({
                message: "Invitation creation requires the ID of the inviting user",
            });
            return;
        }

        Invitations.create({

        }).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).json({
                message: err.message || "Unknown error occurred while creating invitation",
            });
        });
    }

    public static list(req, res): void => {
        
    }

    public static get(req, res): void => {
        
    }

    public static delete(req, res): void => {
        
    }
}