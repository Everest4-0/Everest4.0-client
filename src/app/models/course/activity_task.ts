import { TaskAnswer } from './task_answer';
import { Activity } from './activity';
import { Answer } from 'app/models/quiz/answer';
import { User } from 'app/models/main/user';

export class ActivityTask {
    id: string;
    text: string;
    user: User = new User();
    answers: Array<TaskAnswer> = [];
    activity: Activity = new Activity();
    points: number = 1;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}