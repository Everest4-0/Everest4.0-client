import { ToDo } from './../goal/todo';
import { Enrollment } from './../course/enrollment';
import { Note } from './note';
import { CoachingDuration } from './coaching_duration';
import { CoachingGoal } from './coaching_goal';
import { User } from './../main/user';
import { Chat } from './../main/chat'

export class CoachingSubscription {
    id: string;

    descriptions: string;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    notes: Array<Note> = []
    goal: CoachingGoal = new CoachingGoal();
    duration: CoachingDuration = new CoachingDuration();
    user: User = new User();
    coach: User = new User();
    enrollment: Enrollment = new Enrollment();
    chat: Chat = new Chat()

    todos: Array<ToDo> = [];
    constructor() {
    }
}
