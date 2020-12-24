import { Activity } from './activity';
import { Course } from './course';

export class Module {
    id: string;
    order: number;
    title: string;
    descriptions: boolean;
    course: Course;
    activities: Array<Activity> = [];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}