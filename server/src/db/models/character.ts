import { User } from "./user";
import { Backstory } from "./backstory";
import { Ability } from "./ability";
import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, CreatedAt, DataType, DeletedAt, HasMany, HasOne, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";
import { CharacterAbility } from "./characterAbility";

@Table({
    tableName: 'characters'
})
export class Character extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    @AutoIncrement
    @PrimaryKey
    id: number;
    
    @BelongsTo(() => User)
    userId: number;
    
    @Column
    @Length({ min: 1, max: 200 })
    @NotNull
    name: string;
    
    @Column
    @NotNull
    isNpc: boolean;
    
    @Column
    @Length({ min: 1, max: 100 })
    @NotNull
    pronouns: string;
    
    @HasOne(() => Backstory)
    @AllowNull
    backstoryId?: number;
    
    @CreatedAt
    createdAt: Date;
    
    @UpdatedAt
    updatedAt: Date;
    
    @DeletedAt
    deletedAt: Date;

    @BelongsToMany(() => Ability, () => CharacterAbility)
    abilities: Ability[];
}
