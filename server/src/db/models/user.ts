import { Character } from ".";
import { Invitation } from ".";
import { AllowNull, AutoIncrement, Column, CreatedAt, DataType, DeletedAt, HasMany, Length, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
    tableName: 'users'
})
export class User extends Model {
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    @AutoIncrement
    @PrimaryKey
    id: number;
    
    @Column
    @Length({ min: 1, max: 100 })
    @NotNull
    username: string;
    
    @Column
    @Length({ min: 1, max: 100 })
    @AllowNull
    displayName?: string;
    
    @Column
    @Length({ min: 5, max: 500 })
    @AllowNull
    recoveryEmail?: string;
    
    @Column
    @NotNull
    isAdmin: boolean;

    @HasMany(() => Character)
    characters: Character[];

    @HasMany(() => Invitation)
    invitations: Invitation[];
    
    @CreatedAt
    createdAt: Date;
    
    @UpdatedAt
    updatedAt: Date;
    
    @DeletedAt
    deletedAt: Date;
}
