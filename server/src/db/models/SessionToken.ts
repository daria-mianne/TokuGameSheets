import { AllowNull, AutoIncrement, BeforeCreate, Column, CreatedAt, ForeignKey, Index, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { User } from "./User";
import bcrypt from 'bcryptjs';

@Table({
    tableName: 'session_tokens',
})
export class SessionToken extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column
    declare userId: number;

    @AllowNull(false)
    @Index
    @Unique
    @Column
    declare token: string;

    @CreatedAt
    declare createdAt: Date;

    @BeforeCreate
    static async generateToken(instance: SessionToken) {
        instance.token = await bcrypt.hash(instance.token, 0);
    }

    public static async validToken(token: string) {
        const foundToken = await SessionToken.findOne({
            where: {
                token: async (hashedToken: string) => await bcrypt.compare(token, hashedToken)
            }
        });
        
        if (!foundToken) {
            return false;
        }

        const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30));
        if (foundToken.createdAt < thirtyDaysAgo) {
            // invalidate tokens after 30 days by deleting them
            foundToken.destroy();
            return false;
        }

        return true;
    }
}