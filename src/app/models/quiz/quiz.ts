import { Answer } from 'app/models/quiz/answer';
import { User } from 'app/models/main/user';

export class Quiz {
    id: string;
    text: string;
    isActive:boolean;
    user: User = new User();
    answers:Array<Answer>=[];
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}