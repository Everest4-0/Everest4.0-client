import { CoachingSubscription } from './coaching_subscription';
import { User } from './../main/user';

export class Note {
    id: string;
    code: string;

    title: string;
    descriptions: string;
    userId:string;
    user: User = new User();
    subscription: CoachingSubscription = new CoachingSubscription();
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
