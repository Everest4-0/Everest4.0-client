import { UserEvaluation } from './user-evaluation';
import { User } from '../main/user';
export class EvaluationRequest {
    id: string;
    code: string;
    descriptions: string;
    requester: User = new User();
    requested: User = new User();
    evaluations: Array<UserEvaluation> = [];
    relationId: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    get relation(): string {
        return ['Familiar', 'Colega de trabalho', 'Amigo'][this.relationId - 1];
    }
    get errors(): any[] {
        const errors = [];

        if (!this.relationId) {
            errors.push('O campo relação é obrigatório')
        }
        if (!this.requested.id) {
            errors.push('O campo utilisador é obrigatório')
        }

        return errors;
    }
}