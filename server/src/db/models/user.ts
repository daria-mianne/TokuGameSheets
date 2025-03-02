import { Character } from '.';
import { Invitation } from '.';
import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    DeletedAt,
    HasMany,
    Length,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
    paranoid: true,
})
export class User extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @Length({ min: 1, max: 100 })
    @AllowNull(false)
    @Column
    declare username: string;

    @Length({ min: 1, max: 100 })
    @AllowNull
    @Column
    declare displayName?: string;

    @Length({ min: 5, max: 500 })
    @AllowNull
    @Column
    declare recoveryEmail?: string;

    @AllowNull(false)
    @Column
    declare isAdmin: boolean;

    @HasMany(() => Character)
    declare characters: Character[];

    @HasMany(() => Invitation)
    declare invitations: Invitation[];

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;
}
