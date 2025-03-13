import { useMemoryOnlyDataStore } from "@datastore/memoryOnlyData";
import { VNode } from "preact";
import { Route, RouteProps, useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import { RouteConstraint } from "./routeConstraints";

export function ConstrainedRoute<Props>(props: {
    routeProps: RouteProps<Props> & Partial<Props>,
    constraints: RouteConstraint[]
}): VNode {
    const { currentUser } = useMemoryOnlyDataStore();
    const { url, route } = useLocation();

    useEffect(() => {
        for (const constraint of props.constraints) {
            if (!constraint(currentUser, url, route)) {
                break;
            }
        }
    }, []);

    return <Route {...props.routeProps} />;
}