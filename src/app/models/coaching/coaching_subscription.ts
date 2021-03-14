import { User } from './../main/user';
import { Chat } from './../main/chat'

export class CoachingSubscription {
    id: string;
    code: string;

    title: string;
    descriptions: string;


    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    goal: any;
    duration: any;
    user: User = new User();
    coach: User = new User();
    chat: Chat = new Chat()
    
    constructor() {
    }
}
