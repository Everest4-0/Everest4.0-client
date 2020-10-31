import { SocialUser } from 'angularx-social-login';
import { Role } from './role';

export class User {
    id: string;
    username: string;
    code: string;
    firstName: string;
    lastName: string;
    othersName: string;
    fullName: string;
    email: string;
    apikey: string;

    photoUrl: string;
    provider: string;
    role: Role = new Role();

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;

    /*constructor(description?: string) {
        this.description = description;
    }*/
    castSocialUser(user: SocialUser) {
        this.firstName = user.name.split(' ')[0]
        this.lastName = user.name.split(' ').slice(-1).pop()
        this.email = user.email
        this.photoUrl = user.photoUrl
        this.apikey = user.authToken
        this.provider = user.provider
        

        return this;
    }
}