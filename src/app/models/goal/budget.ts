import { BudgetCategory } from './budget-category';
import { Task } from './task';
export class Budget {
    id: string;
    code: string;

    value: number;
    direction: boolean;
    descriptions: string;
    task: Task = new Task;
    category: BudgetCategory = new BudgetCategory();
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
