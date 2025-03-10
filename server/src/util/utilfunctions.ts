import { Response } from "express";

/**
 * This exists because, while Express _will_ automatically send 500 for errors, it also stops the server.
 * In order to allow the server to keep running, we need to catch these errors and manually send the 500.
 */
export async function catch500(res: Response, callback: () => Promise<void>): Promise<void> {
    try {
        await callback();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}
