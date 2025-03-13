import { VNode } from "preact";
import { RouteProps } from "preact-iso";
import { ConstrainedRoute } from "./ConstrainedRoute";
import { requireLoggedInUser } from "./routeConstraints";

export function LoggedInRoute<Props>(props: RouteProps<Props> & Partial<Props>): VNode {
    return <ConstrainedRoute routeProps={props} constraints={[
        requireLoggedInUser
    ]} />;
}