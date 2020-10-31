import { User } from './user';

export class Role {
    id: string;
    descriptions: string;

    users: Array<User> = []

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    /*constructor(description?: string) {
        this.description = description;
    }*/
}