import { FeedbackPoint } from './feedback_points';
import { User } from './../main/user';
import { CoachingSubscription } from 'app/models/coaching/coaching_subscription';
import { FeedbackComment } from './feedback_comment';
export class Feedback {
    id: string;
    descriptions: string;

    subscription: CoachingSubscription = new CoachingSubscription();
    user: User = new User();
    points: Array<FeedbackPoint> = []
    orderNo: number = 0;

    comments:Array<FeedbackComment>=[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
