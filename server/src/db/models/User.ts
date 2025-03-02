import 'reflect-metadata';
// import { Character } from '.';
// import { Invitation } from '.';
import {
    AllowNull,
    AutoIncrement,
    BeforeCreate,
    BeforeUpdate,
    Column,
    CreatedAt,
    Default,
    DeletedAt,
    // HasMany,
    Length,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

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
    @Unique
    @Column
    declare username: string;

    @AllowNull(false)
    @Column
    declare password: string;

    @Length({ min: 1, max: 100 })
    @AllowNull
    @Column
    declare displayName?: string;

    @Length({ min: 5, max: 500 })
    @AllowNull
    @Column
    declare recoveryEmail?: string;

    @Default(false)
    @AllowNull(false)
    @Column
    declare isAdmin: boolean;

    // @HasMany(() => Character)
    // declare characters: Character[];

    // @HasMany(() => Invitation)
    // declare invitations: Invitation[];

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    @BeforeCreate
    @BeforeUpdate
    static hashPassword(instance: User) {
        if (instance.dataValues.password) {
            instance.dataValues.password = bcrypt.hashSync(instance.dataValues.password, 10);
        }
    }

    public async validPassword(password: string) {
        return await bcrypt.compare(password, this.password); // this.password is hashed
    }
}
