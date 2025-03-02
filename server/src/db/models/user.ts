import { Character } from ".";
import { Invitation } from ".";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, DeletedAt, HasMany, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName: 'users',
    paranoid: true
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    @AutoIncrement
    @PrimaryKey
    declare id: number;
    
    @Column
    @Length({ min: 1, max: 100 })
    @NotNull
    declare username: string;
    
    @Column
    @Length({ min: 1, max: 100 })
    @AllowNull
    declare displayName?: string;
    
    @Column
    @Length({ min: 5, max: 500 })
    @AllowNull
    declare recoveryEmail?: string;
    
    @Column
    @NotNull
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
