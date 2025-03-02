import { User } from '@models';

export class UsersController {
    public static create = async (username: string, password: string, isAdmin: boolean, displayName?: string, recoveryEmail?: string) => {
        return await User.create({
            username,
            password,
            isAdmin,
            displayName,
            recoveryEmail,
        });
    }

    // TODO: This probably shouldn't exist... but maybe?
    public static list = async () => {
        return await User.findAll();
    }

    public static find = async (id: number) => {
        return await User.findByPk(id);
    }

    public static findByName = async (username: string) => {
        return await User.findOne({
            where: {
                username
            }
        });
    }

    // FIXME: VALIDATION VALIDATION VALIDATION JESUS CHRIST VALIDATE THAT THEY'RE ALLOWED TO DO THIS
    public static delete = async (id: number) => {
        const user = await this.find(id);
        if (user) {
            user.destroy();
        }
    }
}
