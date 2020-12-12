import { User } from './user';

export class UserData {
    id: string;
    descriptions: string;

    user: User;
    sex: string;
    fullName: string;
    firstName: string;
    lastName: string;
    othersName: string;
    birthDate: Date;

    academicLevel:any;
    workSituation:any;
    professionalExperience:any;

    salary:number;
    activitySector: number;
    createdAt: Date;
    updatedAt: Date;

    /*constructor(description?: string) {
        this.description = description;
    }*/
}