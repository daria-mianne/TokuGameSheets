import { User } from './frontend/models/User';

declare global {
    export interface Window {
        currentUser: User;
    }
}
