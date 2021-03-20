import { Budget } from './budget';
import { Goal } from './goal';
export class Task {
    id: string;
    revenue: number;
    expenses: number;

    descriptions: string;
    observations: string;
    state: number = 1;
    duration: number;
    dueDate: Date;

    budgets: Array<Budget> = []

    goal: Goal = new Goal();

    tags: Array<any> = [];

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
