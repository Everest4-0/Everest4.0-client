import { ChatMessage } from './chat_message';
import { User } from './user';

export class Chat {
    id: string;
    messages: Array<ChatMessage>=[];

    isActive: boolean;
    isOnline: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {

    }
}