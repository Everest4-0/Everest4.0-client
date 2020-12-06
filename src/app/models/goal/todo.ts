import { User } from 'app/models/user';
export class ToDo {
    id: string;
    code: string;
    subject: string;
    descriptions: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    done: boolean;
    user: User = new User();
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}