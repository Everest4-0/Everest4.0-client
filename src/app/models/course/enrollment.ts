import { Activity } from './activity';
import { User } from './../main/user';
import { Course } from './course';

export class Enrollment {
    id: string;
    code: number;
    descriptions: boolean;

    course: Course=new Course;
    courseId: string;
    user: User;
    userId: string;

    lastActivity: Activity = new Activity();
    activityId:string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}