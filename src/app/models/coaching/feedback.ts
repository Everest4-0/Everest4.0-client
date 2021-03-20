import { FeedbackPoint } from './feedback_points';
import { User } from './../main/user';
import { CoachingSubscription } from 'app/models/coaching/coaching_subscription';
export class Feedback {
    id: string;
    descriptions: string;

    subscription: CoachingSubscription = new CoachingSubscription();
    user: User = new User();
    points: Array<FeedbackPoint> = []
    orderNo: number = 0;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
