import { FormBuilder, Validators } from '@angular/forms';

export class ProfessionalExperienceForm{
    constructor(fbx:FormBuilder){
        let fb = new FormBuilder();

        return fb.group({
            from: ['', Validators.required],
            to: ['', Validators.required],
            descriptions: ['', Validators.required],
            isActive: ['', Validators.required]
        })
    }
}