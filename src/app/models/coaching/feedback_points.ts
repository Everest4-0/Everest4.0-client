import { FeedbackItem } from './feedback_item';
import { Feedback } from './feedback';

export class FeedbackPoint {
    id: string;
    descriptions: string;
    point: number = 0;

    feedback: Feedback = new Feedback();
    item: FeedbackItem = new FeedbackItem();

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor(item?) {
        this.item=item
    }
}
