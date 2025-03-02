import { Express } from 'express';
import { initInvitationRoutes } from './invitationRoutes';
import { initUserRoutes } from './userRoutes';

const routeInitMethods = [
    initInvitationRoutes,
    initUserRoutes,
];

export const initAllRoutes = (app: Express) => {
    for (const initMethod of routeInitMethods) {
        initMethod(app);
    }
}