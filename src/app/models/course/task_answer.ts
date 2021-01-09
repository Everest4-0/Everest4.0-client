import { ActivityTask } from './activity_task';
import { Enrollment } from './enrollment';
import { User } from './../main/user';

export class TaskAnswer {
    id: string;
    text: string;
    correct: boolean = false;
    users: Array<User> = []
    task: ActivityTask = new ActivityTask()
    taskId: string;
    enrollments: Array<Enrollment> = [];
    createdAt: Date;
    updatedAt: Date;


    constructor(correct = false, text = '') {
        this.correct = correct;
        this.text = text;
    }
}