import { AppService } from './../../services/app.service';
import { UserSetting } from './user_setting';
import { UserData } from './user_data';
import { EvaluationRequest } from '../diagnostic/evaluation-request';
import { Evaluation } from '../diagnostic/evaluation';
import { SocialUser } from 'angularx-social-login';
import { Role } from './role';
import { Account } from 'msal';

export class User {
    id: string;
    username: string;
    code: string;

    email: string;
    telePhone: number;

    apikey: string;
    password: string;

    photoUrl: string;

    get avatar():string {
        debugger
        let prefix = this.photoUrl.split('ttps://').length > 1 ? '' : AppService.serverAddress
        return prefix + this.photoUrl
    }
    provider: string = 'LOCAL';
    roleId: string;
    role: Role = new Role();
    roles: Array<string> = [];

    evaluators: Array<Evaluation> = []
    evaluations: Array<Evaluation> = []
    evaluationRequestes: Array<EvaluationRequest> = []
    evaluationRequested: Array<EvaluationRequest> = []

    datas: UserData = new UserData();
    settings: UserSetting = new UserSetting();

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;



    constructor() {
        this.datas = new UserData()
        this.settings = new UserSetting()
    }
    castSocialUser(user) {
        this.datas = new UserData()
        this.settings = new UserSetting()
        user = { 'GOOGLE': this.castGoogleUser, 'MICROSOFT': this.castMicrosoftUser }[user.provider || 'MICROSOFT'](user);
        this.datas = user.datas
        this.email = user.email
        this.photoUrl = user.photoUrl
        this.apikey = user.apikey
        this.provider = user.provider

        //return { 'GOOGLE': this.castGoogleUser, 'MICROSOFT': this.castMicrosoftUser }[user.provider || 'MICROSOFT'](user);
    }
    castGoogleUser(user: SocialUser) {
        this.datas = new UserData()
        this.settings = new UserSetting()
        let fullName = user.name.split(' ')
        this.datas.firstName = fullName.shift()
        this.datas.lastName = fullName.join(' ');
        this.email = user.email
        this.photoUrl = user.photoUrl
        this.apikey = user.authToken
        this.provider = user.provider

        return this;
    }
    castMicrosoftUser(user: Account) {

        this.datas = new UserData()
        this.settings = new UserSetting()
        let fullName = user.name.split(' ')
        this.datas.firstName = fullName.shift()
        this.datas.lastName = fullName.join(' ');
        this.email = user.userName
        //this.photoUrl = user.photoUrl
        this.apikey = user.homeAccountIdentifier
        this.provider = 'MICROSOFT'

        return this;
    }

    get ownRole() {

        return [{ name: this.roleId, icon: 'pe-7s-medal', color: 'bg-warning' },
        { name: this.roleId, icon: 'pe-7s-delete-user', color: 'bg-default' },][this.roleId == 'FREE' ? 0 : 1]
    }
    set passw(p: string) {
        this.password = p + '~'
    }

}