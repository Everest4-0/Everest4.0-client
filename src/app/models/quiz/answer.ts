import { User } from './../main/user';
import { Quiz } from './quiz';

export class Answer {
    id: string;
    text: string;
    correct: boolean = false;
    createdAt: Date;
    updatedAt: Date;               
    users: Array<User> = []
    quiz: Quiz = new Quiz();

    constructor(correct = false, text = '') {
        this.correct = correct;
        this.text = text;
    }
}