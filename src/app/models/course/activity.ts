import { Module } from './module';

export class Activity {
    id: string;
    code: number;

    title: string;
    descriptions: string;
    duration: number;
    orderNo: number;
    module: Module;

    attachment: string;

    status: number = 0;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;


    i: number;
    constructor() {
    }
}