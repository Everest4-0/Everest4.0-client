import { Task } from './task';
export class Budget {
    id: string;
    code: string;

    value: number;
    direction: boolean;
    descriptions: string;
    task: Task = new Task;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
