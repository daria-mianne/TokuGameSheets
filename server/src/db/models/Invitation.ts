import 'reflect-metadata';
import { User } from '.';
import {
    AutoIncrement,
    Column,
    CreatedAt,
    Default,
    DeletedAt,
    IsUUID,
    Model,
    AllowNull,
    PrimaryKey,
    Table,
    DataType,
    // BelongsTo ,
    ForeignKey,
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

    @Default(DataType.UUIDV4)
    @IsUUID(4)
    @AllowNull(false)
    @Column
    declare guid: string;

    @ForeignKey(() => User)
    @Column
    declare invitingUserId: number;

    @Column
    declare forAdmin: boolean;

    // @BelongsTo(() => User)
    // declare invitingUser: User;

    @CreatedAt
    declare createdAt: Date;

    @DeletedAt
    declare deletedAt: Date;
}
