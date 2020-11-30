import { EvaluationRequest } from './evaluation-request';
import { Evaluation } from './evaluation';
import { SocialUser } from 'angularx-social-login';
import { Role } from './role';
import { Account } from 'msal';

export class User {
    id: string;
    username: string;
    code: string;
    firstName: string;
    lastName: string;
    othersName: string;
    
    get fullName(){
        return this.firstName + ' ' + this.lastName
    }
    email: string;
    telePhone: number;
    apikey: string;

    password: string;

    photoUrl: string;
    provider: string = 'LOCAL';
    roleId: string;
    role: Role = new Role();

    evaluators: Array<Evaluation> = []
    evaluations: Array<Evaluation> = []
    evaluationRequestes: Array<EvaluationRequest> = []
    evaluationRequested: Array<EvaluationRequest> = []

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;



    /*constructor(description?: string) {
        this.description = description;
    }*/
    castSocialUser(user) {
        user = { 'GOOGLE': this.castGoogleUser, 'MICROSOFT': this.castMicrosoftUser }[user.provider || 'MICROSOFT'](user);
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.photoUrl = user.photoUrl
        this.apikey = user.apikey
        this.provider = user.provider

        //return { 'GOOGLE': this.castGoogleUser, 'MICROSOFT': this.castMicrosoftUser }[user.provider || 'MICROSOFT'](user);
    }
    castGoogleUser(user: SocialUser) {
        let fullName = user.name.split(' ')
        this.firstName = fullName.shift()
        this.lastName = fullName.join(' ');
        this.email = user.email
        this.photoUrl = user.photoUrl
        this.apikey = user.authToken
        this.provider = user.provider

        return this;
    }
    castMicrosoftUser(user: Account) {
        let fullName = user.name.split(' ')
        this.firstName = fullName.shift()
        this.lastName = fullName.join(' ');
        this.email = user.userName
        //this.photoUrl = user.photoUrl
        this.apikey = user.homeAccountIdentifier
        this.provider = 'MICROSOFT'

        return this;
    }

    get ownRole() {
        debugger
        return [{ name: this.roleId, icon: 'pe-7s-medal', color: 'bg-warning' },
        { name: this.roleId, icon: 'pe-7s-delete-user', color: 'bg-default' },][this.roleId == 'FREE' ? 0 : 1]
    }
    set passw(p: string) {
        this.password = p + '~'
    }

    get avatar() {
        return this.photoUrl
    }
}