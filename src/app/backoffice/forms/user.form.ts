import { FormBuilder, Validators } from "@angular/forms";

export class UserForm {

    constructor(fbx: FormBuilder) {
        let fb=new FormBuilder();
        return fb.group({
            userName: ['',Validators.required],
            email: ['', Validators.required],
            telePhone: ['', Validators.required],
            isActive: ['', Validators.required],
            roles: ['', Validators.required],
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
            newsCategories: ['', Validators.required],
            i18n: [''],
            timeZones: [''],
        })
    }
}