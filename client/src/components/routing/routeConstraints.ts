import { User } from "@models/user";

interface RouteFunction {
    (url: string, replace?: boolean): void;
}

/** This function should return true if the constraint passed and false if it failed. */
export interface RouteConstraint {
    (currentUser: User | null, url: string, route: RouteFunction): boolean;
}

export const requireAdmin: RouteConstraint = (currentUser: User | null, _: string, route: RouteFunction): boolean => {
    if (!currentUser?.isAdmin) {
        route('/');
        return false;
    }
    return true;
}

export const requireLoggedInUser: RouteConstraint = (currentUser: User | null, url: string, route: RouteFunction) => {
    if (!currentUser) {
        const redirectUri = `/login?redirectUri=${encodeURIComponent(url.includes('logout') ? '/' : url)}`;
        route(redirectUri);
        return false;
    }
    return true;
}
