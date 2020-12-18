import { FormBuilder } from "@angular/forms";

export class UserForm {

    constructor(fbx: FormBuilder) {
        let fb=new FormBuilder();
        return fb.group({
            userName: [''],
            email: [''],
            telePhone: [''],
            isActive: [''],
            roles: [''],
            othersName: [''],
            firstName: [''],
            lastName: [''],
            academicLevel: [''],
            sex: [''],
            birthDate: [''],
            workSituation: [''],
            professionalExperience: [''],
            activitySector: [''],
            salary: [''],
            newsCategories: [''],
            i18n: [''],
            timeZones: [''],
        })
    }
}