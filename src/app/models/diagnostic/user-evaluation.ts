import { EvaluationRequest } from './evaluation-request';
import { Evaluation } from './evaluation';
import { User } from '../main/user';
export class UserEvaluation {
    id: string;
    points = 0;
    descriptions: string;
    requester: User = new User()
    requested: User = new User()
    request: EvaluationRequest = new EvaluationRequest()
    evaluation: Evaluation = new Evaluation()
    evaluationId: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}