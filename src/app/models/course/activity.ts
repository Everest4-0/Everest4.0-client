import { Module } from './module';

export class Activity {
    id: string;
    code: number;

    title: string;
    descriptions: string;
    duration:number;
    order:number;
    module: Module;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}