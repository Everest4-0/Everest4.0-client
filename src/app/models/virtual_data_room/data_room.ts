
import { User } from 'app/models/main/user';

export class DataRoom {
    id: string;
    code: string;
    descriptions: string;
    title: string;
    type: string;
    isActive: boolean;
    user: User = new User();
    files: Array<any> = [];
    shareds: Array<any> = [];
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
