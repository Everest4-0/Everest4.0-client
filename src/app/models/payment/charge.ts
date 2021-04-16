import { Customer } from './customer';

export class Charge {
    id: string;
    description: string;
    amount: number;
    currency: string;
    
    customer: Customer = new Customer();
    isActive: boolean=false;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}