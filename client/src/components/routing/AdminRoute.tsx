import { VNode } from 'preact';
import { RouteProps } from 'preact-iso';
import { ConstrainedRoute } from './ConstrainedRoute';
import { requireAdmin, requireLoggedInUser } from './routeConstraints';

export function AdminRoute<Props>(props: RouteProps<Props> & Partial<Props>): VNode {
    return <ConstrainedRoute routeProps={props} constraints={[requireLoggedInUser, requireAdmin]} />;
}
