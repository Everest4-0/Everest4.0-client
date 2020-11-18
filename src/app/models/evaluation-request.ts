import { Evaluation } from './evaluation';
import { User } from './user';
export class EvaluationRequest {
    id: string;
    code: string;
    requester: User = new User();
    requested: User = new User();
    evaluation: Evaluation = new Evaluation();
    relationId: Number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}