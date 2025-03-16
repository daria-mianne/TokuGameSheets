import { Express } from 'express';
import { initInvitationRoutes } from './invitationRoutes';
import { initUserRoutes } from './userRoutes';
import { initAbilityRoutes } from './abilityRoutes';
import { initCharacterRoutes } from './characterRoutes';

const routeInitMethods = [initAbilityRoutes, initCharacterRoutes, initInvitationRoutes, initUserRoutes];

export const initAllRoutes = (app: Express) => {
    for (const initMethod of routeInitMethods) {
        initMethod(app);
    }
};
