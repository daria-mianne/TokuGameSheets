import { Backstory, Character, PersonalityTrait, Relationship } from '@models';
import { addRoute } from '@util/utilfunctions';
import { Express, Request, Response } from 'express';

export function initCharacterRoutes(app: Express) {
    addRoute(app, 'get', 'v0', 'characters/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const character = await Character.findByPk(id);
        if (character) {
            res.status(200).json(character);
        }

        res.status(404).send();
    });

    addRoute(app, 'get', 'v0', 'characters', async (_: Request, res: Response) => {
        const characters = await Character.findAll();
        res.status(200).json(characters);
    });

    addRoute(app, 'get', 'v0', 'npcs', async (_: Request, res: Response) => {
        const npcs = await Character.findAll({
            where: {
                isNpc: true,
            },
        });
        res.status(200).json(npcs);
    });

    addRoute(app, 'post', 'v0', 'characters', async (req: Request, res: Response) => {
        const { userId, name, isNpc, pronouns, backstoryText, color, personalityTraits, npcRelationships } = req.body;
        const backstory = await Backstory.create({ backstory: backstoryText });
        const character = await Character.create({
            userId,
            name,
            isNpc,
            pronouns,
            backstoryId: backstory.id,
            rangerColor: color,
        });
        await Promise.all([
            ...personalityTraits.map((trait: { description: string }) =>
                PersonalityTrait.create({
                    characterId: character.id,
                    description: trait.description,
                })
            ),
            ...npcRelationships.map((relationship: { npcId: number; valence: number; description: string }) =>
                Relationship.create({
                    char1Id: character.id,
                    char2Id: relationship.npcId,
                    valence: relationship.valence,
                    description: relationship.description,
                })
            ),
        ]);
        res.status(200).json(character.id);
    });

    addRoute(app, 'post', 'v0', 'characters/:id', async (req: Request, res: Response) => {
        // TODO: wrap this whole thing in a transaction
        const { id } = req.params;
        const character = await Character.findByPk(id);
        if (!character) {
            res.status(404).send();
            return;
        }
        const { name, isNpc, pronouns, backstoryText, color, personalityTraits, npcRelationships } = req.body;

        if (character.backstoryId) {
            const backstory = await Backstory.findByPk(character.backstoryId);
            if (backstory) {
                backstory.backstory = backstoryText;
                backstory.save();
            } else {
                const newBackstory = await Backstory.create({ backstory: backstoryText });
                character.backstoryId = newBackstory.id;
            }
        }

        const traitPromises: Promise<PersonalityTrait>[] = [];
        for (const personalityTrait of personalityTraits) {
            const { id, characterId, description } = personalityTrait;
            if (!id && !characterId) {
                res.status(400).json({
                    message: 'Cannot create a personality trait without a character ID',
                });
                return;
            }

            if (id) {
                const dbTrait = await PersonalityTrait.findByPk(id);
                if (!dbTrait) {
                    res.status(404).json({
                        message: `Personality trait with id ${id} does not exist`,
                    });
                    return;
                }
                dbTrait.setAttributes({
                    description,
                });
                traitPromises.push(dbTrait.save());
            } else {
                traitPromises.push(
                    PersonalityTrait.create({
                        characterId,
                        description,
                    })
                );
            }
        }
        await Promise.all(traitPromises);

        const relationshipPromises: Promise<Relationship>[] = [];
        for (const relationship of npcRelationships) {
            const { id, char1Id, char2Id, valence, description } = relationship;
            if (!id && !(char1Id && char2Id)) {
                res.status(400).json({
                    message: 'Cannot create a relationship without both character IDs',
                });
                return;
            }

            if (id) {
                const relationship = await Relationship.findByPk(id);
                if (!relationship) {
                    res.status(404).json({
                        message: `Relationship with id ${id} does not exist`,
                    });
                    return;
                }
                relationship.setAttributes({
                    valence,
                    description,
                });
                relationshipPromises.push(relationship.save());
            } else {
                relationshipPromises.push(
                    Relationship.create({
                        char1Id,
                        char2Id,
                        valence,
                        description,
                    })
                );
            }
        }
        await Promise.all(relationshipPromises);

        character.setAttributes({
            name,
            isNpc,
            pronouns,
            rangerColor: color,
        });
        try {
            await character.save();
            res.status(200).send();
        } catch (validationError) {
            res.status(400).json(validationError);
        }
    });

    addRoute(app, 'delete', 'v0', 'characters/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const character = await Character.findByPk(id);
        if (!character) {
            res.status(404).send();
            return;
        }

        await character.destroy();
        res.status(200).send();
    });
}
