import { Ability } from '@models';
import { addRoute } from '@util/utilfunctions';
import { Express, Request, Response } from 'express';

export function initAbilityRoutes(app: Express) {
    addRoute(app, 'get', 'v0', 'abilities/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const ability = await Ability.findByPk(id);
        if (ability) {
            res.status(200).json(ability);
            return;
        }

        res.status(404).send();
    });

    addRoute(app, 'get', 'v0', 'abilities', async (_: Request, res: Response) => {
        const abilities = await Ability.findAll();
        res.status(200).json(abilities);
    });

    addRoute(app, 'post', 'v0', 'abilities', async (req: Request, res: Response) => {
        const {
            adminOnly,
            type,
            description,
        } = req.body;
        const ability = await Ability.create({
            adminOnly,
            type,
            description,
        });
        res.status(200).json(ability);
    });

    addRoute(app, 'post', 'v0', 'abilities/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            adminOnly,
            type,
            description,
        } = req.body;
        const ability = await Ability.findByPk(id);
        if (!ability) {
            res.status(404).send();
            return;
        }

        if (adminOnly !== undefined) {
            ability.adminOnly = adminOnly;
        }
        if (type !== undefined) {
            ability.type = type;
        }
        if (description !== undefined) {
            ability.description = description;
        }
        
        try {
            await ability.save();
            res.status(200).send();
        } catch (validationError) {
            res.status(400).json(validationError);
        }
    })

    addRoute(app, 'delete', 'v0', 'abilities/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const ability = await Ability.findByPk(id);
        if (ability) {
            res.status(200).json(ability);
            return;
        }

        res.status(404).send();
    })
}