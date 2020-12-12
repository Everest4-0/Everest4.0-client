import { Task } from './task';
import { PartialGoal } from './partial-goal';
import { User } from 'app/models/main/user';
export class Goal {
    id: string;
    code: string;

    group;
    val: any = { code: '', name: '' };
    objectives: string;
    kpi: number;
    descriptions: string;
    anualGoal;
    partials: Array<PartialGoal> = [];
    tasks: Array<Task> = [];
    user: User = new User();
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        //let partial=[new PartialGoal(), new PartialGoal(), new PartialGoal(), new PartialGoal()];
        //this.partials=partials;
    }
}