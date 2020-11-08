import { Evaluation } from './evaluation';
import { User } from './user';
export class UserEvaluation {
    id: string;
    points: Number = 0;
    descriptions: string;
    user: User = new User()
    evaluator: User = new User()
    evaluation: Evaluation = new Evaluation()
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}