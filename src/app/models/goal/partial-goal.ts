import { Goal } from './goal';
import { User } from 'app/models/main/user';
export class PartialGoal {
    id: string;
    value: number;

    descriptions: string;

    goal: Goal = new Goal()

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
