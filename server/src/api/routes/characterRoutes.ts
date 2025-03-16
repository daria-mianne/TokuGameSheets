import { Backstory, Character } from '@models';
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

    addRoute(app, 'post', 'v0', 'characters', async (req: Request, res: Response) => {
        const { userId, name, isNpc, pronouns, backstoryText } = req.body;
        const backstory = await Backstory.create({ backstory: backstoryText });
        const character = await Character.create({
            userId,
            name,
            isNpc,
            pronouns,
            backstoryId: backstory.id,
        });
        res.status(200).json(character);
    });

    addRoute(app, 'post', 'v0', 'characters/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const character = await Character.findByPk(id);
        if (!character) {
            res.status(404).send();
            return;
        }
        const { name, isNpc, pronouns, backstoryText } = req.body;

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

        character.setAttributes({
            name,
            isNpc,
            pronouns,
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
