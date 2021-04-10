import { Enrollment } from './enrollment';
import { User } from 'app/models/main/user';
import { Evaluation } from '../diagnostic/evaluation';
import { Module } from './module';

export class Course {
    id: string;
    code: string;

    title: string;
    descriptions: string;
    level: number;
    language: string;

    modules: Array<Module> = [];
    evaluations: Array<Evaluation> = [];
    enrollments: Array<Enrollment> = [];

    user: User = new User();
    cover: string;

    privacity = 0;
    roles: Array<string> = [];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}