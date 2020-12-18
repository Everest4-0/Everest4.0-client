import { User } from './user';

export class UserSetting {
    id: string;
    descriptions: string;

    user: User;
    newsCategories: Array<string> = [];
    i18n: string;
    timeZones: string;

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    /*constructor(description?: string) {
        this.description = description;
    }*/
}