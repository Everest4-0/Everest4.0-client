import { Course } from './../course/course';
export class Evaluation {
    id: string;
    code: string;
    name: string;
    points: number;
    descriptions: string;
    group: string;

    courses: Array<Course> = []
    
    isActive: boolean = true;
    createdAt: Date;
    updatedAt: Date;
}