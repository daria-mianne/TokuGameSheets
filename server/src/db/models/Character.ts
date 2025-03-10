import 'reflect-metadata';
import {
    // Ability,
    Backstory,
    // CharacterAbility,
    User,
} from '.';
import {
    AllowNull,
    AutoIncrement,
    // BelongsTo,
    // BelongsToMany,
    Column,
    CreatedAt,
    DeletedAt,
    ForeignKey,
    // HasOne,
    Length,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'characters',
    paranoid: true,
})
export class Character extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @ForeignKey(() => User)
    @Column
    declare userId: number;

    // @BelongsTo(() => User)
    // declare user: User;

    @Length({ min: 1, max: 200 })
    @AllowNull(false)
    @Column
    declare name: string;

    @AllowNull(false)
    @Column
    declare isNpc: boolean;

    @Length({ min: 1, max: 100 })
    @AllowNull(false)
    @Column
    declare pronouns: string;

    @ForeignKey(() => Backstory)
    @AllowNull
    @Column
    declare backstoryId?: number;

    @CreatedAt
    declare createdAt: Date;

    @UpdatedAt
    declare updatedAt: Date;

    @DeletedAt
    declare deletedAt: Date;

    // @BelongsToMany(() => Ability, () => CharacterAbility)
    // declare abilities: Ability[];
}
