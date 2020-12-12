import { UserEvaluation } from './user-evaluation';
import { User } from '../main/user';
export class EvaluationRequest {
    id: string;
    code: string;
    requester: User = new User();
    requested: User = new User();
    evaluations: Array<UserEvaluation> = [];
    relationId: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    get relation() {
        alert(['Familiar', 'Colega de trabalho', 'Amigo'][this.relationId - 1])
        return ['Familiar', 'Colega de trabalho', 'Amigo'][this.relationId - 1];
    }
}