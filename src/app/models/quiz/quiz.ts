import { User } from 'app/models/main/user';

export class Quiz {
    id: string;
    text: string;
    descriptions: string;
    user: User = new User();
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}