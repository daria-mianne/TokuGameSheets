import { Invitation } from '@models';

export class InvitationsController {
    public static create = async (invitingUserId: number, forAdmin: boolean): Promise<Invitation> => {
        return await Invitation.create({ invitingUserId, forAdmin });
    };

    public static list = async (): Promise<Invitation[]> => {
        return await Invitation.findAll();
    };

    public static find = async (id: number): Promise<Invitation | null> => {
        return await Invitation.findByPk(id);
    };

    public static findByGuid = async (guid: string): Promise<Invitation | null> => {
        return await Invitation.findOne({ where: { guid, deletedAt: null } });
    };

    public static delete = async (id: number): Promise<Invitation | null> => {
        const invitation = await this.find(id);
        if (invitation) {
            await invitation.destroy();
            return invitation;
        }
        return null;
    };
}
