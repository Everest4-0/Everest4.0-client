import { FormBuilder } from '@angular/forms';

export class ProfessionalExperienceForm{
    constructor(fbx:FormBuilder){
        let fb = new FormBuilder();

        return fb.group({
            from: [''],
            to: [''],
            descriptions: [''],
            isActive: ['']
        })
    }
}