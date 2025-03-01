import { DataTypes } from "sequelize";
import { User } from "./user";
import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, Default, DeletedAt, ForeignKey, IsUUID, Model, NotNull, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    timestamps: true,
})
export class Invitation extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED,
    })
    @AutoIncrement
    @PrimaryKey
    id!: number;

    @Column
    @Default(DataTypes.UUIDV4)
    @IsUUID(4)
    @NotNull
    guid: string;

    @ForeignKey(() => User)
    @Column
    invitingUserId: number;

    @BelongsTo(() => User)
    invitingUser: User;

    @CreatedAt
    createdAt: Date;

    @DeletedAt
    deletedAt: Date;
}
