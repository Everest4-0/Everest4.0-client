import { ActivityTask } from './activity_task';
import { Module } from './module';

export class Activity {
    id: string;
    code: number;

    title: string;
    descriptions: string;
    duration: number;
    orderNo: number;
    module: Module = new Module();

    attachment: string;
    tasks: Array<ActivityTask> = [];

    attType: number = 0;
    status: number = 0;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;


    i: number;
    constructor() {
    }
}