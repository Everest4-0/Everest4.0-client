import { Budget } from './budget';

export class BudgetCategory {
    id: string;
    code: string;

    name: string;
    direction: boolean;
    descriptions: string;
    budgets: Array<Budget> = [];

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
