import { User } from "./user";
import { Backstory } from "./backstory";
import { Ability } from "./ability";
import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { CharacterAbility } from "./characterAbility";

@Table({
    tableName: 'characters',
    paranoid: true,
})
export class Character extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    @AutoIncrement
    @PrimaryKey
    declare id: number;
    
    @BelongsTo(() => User)
    declare userId: number;
    
    @Column
    @Length({ min: 1, max: 200 })
    @NotNull
    declare name: string;
    
    @Column
    @NotNull
    declare isNpc: boolean;
    
    @Column
    @Length({ min: 1, max: 100 })
    @NotNull
    declare pronouns: string;
    
    @HasOne(() => Backstory)
    @AllowNull
    declare backstoryId?: number;
    
    @CreatedAt
    declare createdAt: Date;
    
    @UpdatedAt
    declare updatedAt: Date;
    
    @DeletedAt
    declare deletedAt: Date;

    @BelongsToMany(() => Ability, () => CharacterAbility)
    declare abilities: Ability[];
}
