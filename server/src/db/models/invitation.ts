import { DataTypes } from "sequelize";
import { User } from "./user";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, Default, DeletedAt, ForeignKey, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    timestamps: true,
    paranoid: true,
})
export class Invitation extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
    })
    @AutoIncrement
    @PrimaryKey
    declare id: number;

    @Column
    @Default(DataTypes.UUIDV4)
    @IsUUID(4)
    @NotNull
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
