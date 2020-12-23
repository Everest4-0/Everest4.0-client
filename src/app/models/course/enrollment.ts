import { User } from './../main/user';
import { Course } from './course';

export class Enrollment {
    id: string;
    code: number;
    descriptions: boolean;

    course: Course;
    user: User;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}