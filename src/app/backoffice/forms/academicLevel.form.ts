import { FormBuilder, Validators } from '@angular/forms';

export class AcademicLevelForm{
    
    constructor(fbx:FormBuilder){
        let fb = new FormBuilder();

        return fb.group({
            name: ['', Validators.required],
            descriptions: ['', Validators.required],
            isActive: ['', Validators.required]
        })
    }
}