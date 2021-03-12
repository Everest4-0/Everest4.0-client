import { User } from './../main/user';

export class Note {
    id: string;
    code: string;

    title: string;
    descriptions: string;
    
    user: User = new User();
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
