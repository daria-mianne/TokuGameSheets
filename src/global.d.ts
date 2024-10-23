import User from "./models/User";

declare global {
    export interface Window {
        currentUser: User;
    }
}