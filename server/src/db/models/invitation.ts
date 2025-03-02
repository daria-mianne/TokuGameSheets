import { DataTypes } from 'sequelize';
import { User } from '.';
import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    Default,
    DeletedAt,
    ForeignKey,
    IsUUID,
    Model,
    AllowNull,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';

@Table({
    tableName: 'invitations',
    paranoid: true,
})
export class Invitation extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @Default(DataTypes.UUIDV4)
    @IsUUID(4)
    @AllowNull(false)
    @Column
    declare guid: string;

    @ForeignKey(() => User)
    @Column
    declare invitingUserId: number;

    @BelongsTo(() => User)
    declare invitingUser: User;

    @CreatedAt
    declare createdAt: Date;

    @DeletedAt
    declare deletedAt: Date;
}
