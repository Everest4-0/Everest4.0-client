import { Role } from './role';

export class User {
    id: string;
    username: string;
    code: string;
    firstName: string;
    lastName: string;
    othersName: string;
    fullName: string;
    email: string;
    apikey: string;

    role: Role = new Role();

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    /*constructor(description?: string) {
        this.description = description;
    }*/
}