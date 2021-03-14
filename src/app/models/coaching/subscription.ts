import { Goal } from 'app/models/goal/goal';
import { Duration } from './duration';
import { User } from 'app/models/main/user';

export class Subscription {
    id: string;
    title:string;
    description: string;
    isActive: boolean;
    user: User = new User();
    duration: Duration = new Duration();
    goal: Goal = new Goal();
    activatedAt:string;
    createdAt: Date;
    updatedAt: Date;

}