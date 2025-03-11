import 'reflect-metadata';
// import { Character } from '.';
import {
    AutoIncrement,
    Column,
    DataType,
    // HasMany,
    Max,
    Min,
    Model,
    AllowNull,
    PrimaryKey,
    Table,
    ForeignKey,
} from 'sequelize-typescript';
import { Character } from './Character';

@Table({
    tableName: 'relationships',
})
export class Relationship extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    declare id: number;

    @Min(-1)
    @Max(1)
    @AllowNull(false)
    @Column
    declare valence: number;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(1000),
    })
    declare description: string;

    @ForeignKey(() => Character)
    declare char1Id: number;

    @ForeignKey(() => Character)
    declare char2Id: number;

    // @HasMany(() => Character)
    // declare characterIds: number[];
}
