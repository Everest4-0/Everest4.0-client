import { Entity } from './../entity';
import { BudgetCategory } from './budget-category';
import { Task } from './task';
export class Budget extends Entity<Budget> {
    id: string;
    code: string;

    value: number;
    direction: boolean;
    descriptions: string;
    task: Task = new Task;
    taskId: string;
    category: BudgetCategory = new BudgetCategory();
    categoryId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        super()
    }
}
