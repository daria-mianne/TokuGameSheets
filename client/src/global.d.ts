import { User } from '@models/user';

declare global {
    export interface Window {
        currentUser: User;
    }
}
