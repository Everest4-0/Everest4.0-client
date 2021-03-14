import { Chat } from './chat';
import { User } from './user';

export class ChatMessage {
    id: string;
    message: string;

    from: User = new User()
    to: User = new User()
    chat: Chat = new Chat()

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.createdAt=new Date();
    }
}