import { Quiz } from './quiz';

export class Answer {
    id: string;
    text: string;
    correct: boolean;
    createdAt: Date;
    updatedAt: Date;
    quiz: Quiz = new Quiz();

    constructor() {
    }
}