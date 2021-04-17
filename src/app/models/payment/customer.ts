import { Charge } from './charge';
import { Address } from './address';
import { User } from 'app/models/main/user';

export class Customer {
    id: string;
    name: string;
    email: string;
    descriptions: string;
    isActive: boolean;

    address: Address = new Address();
    charges: Array<Charge> = [];
    user: User = new User();

    source: any;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
    }
}