import { FeedbackPoint } from './feedback_points';
import { User } from '../main/user';
import { CoachingSubscription } from 'app/models/coaching/coaching_subscription';
import { Feedback } from './feedback';
export class FeedbackComment {
    id: string;
    text: string;

    user: User = new User();
    feedback: Feedback = new Feedback()

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}
