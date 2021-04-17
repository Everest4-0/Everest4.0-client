import { Customer } from './customer';

export class Charge {
    id: string;
    descriptions: string;
    amount: number;
    currency: string = 'AOA';
    discount: number = 0;
    quantity: number = 1;
    services: Array<any> = []

    customer: Customer = new Customer();
    isActive: boolean = false;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}