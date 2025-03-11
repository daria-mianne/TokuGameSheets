import { Express } from 'express';
import { initInvitationRoutes } from './invitationRoutes';
import { initUserRoutes } from './userRoutes';
import { initAbilityRoutes } from './abilityRoutes';

const routeInitMethods = [initAbilityRoutes, initInvitationRoutes, initUserRoutes];

export const initAllRoutes = (app: Express) => {
    for (const initMethod of routeInitMethods) {
        initMethod(app);
    }
};
