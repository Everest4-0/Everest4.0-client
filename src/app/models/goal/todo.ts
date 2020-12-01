import { User } from 'app/models/user';
export class ToDo {
    id: string;
    code: string;
    descriptions: string;
    date: Date;
    done: boolean;
    user: User = new User();
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}