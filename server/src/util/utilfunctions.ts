import { Express, Request, Response } from 'express';

export type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export function addRoute(
    app: Express,
    method: RequestMethod,
    apiVersion: string,
    endpoint: string,
    routeHandler: (req: Request, res: Response) => Promise<void>
): void {
    let appMethod;
    switch (method) {
        case 'post':
            appMethod = app.post;
            break;
        case 'put':
            appMethod = app.put;
            break;
        case 'delete':
            appMethod = app.delete;
            break;
        case 'get':
        default:
            appMethod = app.get;
    }
    appMethod(`/api/${apiVersion}/${endpoint}`, errorCatcher(routeHandler));
}

/**
 * This exists because, while Express _will_ automatically send 500 for errors, it also kills the server.
 * In order to allow the server to keep running, we need to catch these errors and manually send the 500.
 */
function errorCatcher(
    routeHandler: (req: Request, res: Response) => Promise<void>
): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
        try {
            await routeHandler(req, res);
        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    };
}
