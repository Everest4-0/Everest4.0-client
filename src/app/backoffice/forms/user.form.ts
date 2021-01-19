import { FormBuilder, Validators } from "@angular/forms";

export class UserForm {

    constructor(fbx: FormBuilder) {
        let fb=new FormBuilder();
        return fb.group({
            userName: ['',Validators.required],
            email: [''],
            telePhone: ['', Validators.required],
            isActive: [''],
            roles: [''],
            othersName: [''],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            academicLevel: ['', Validators.required],
            sex: ['', Validators.required],
            birthDate: ['', Validators.required],
            workSituation: ['', Validators.required],
            professionalExperience: ['', Validators.required],
            activitySector: ['', Validators.required],
            salary: [''],
            newsCategories: [''],
            i18n: [''],
            timeZones: [''],
        })
    }
}