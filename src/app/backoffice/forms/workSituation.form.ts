import { FormBuilder, Validators } from '@angular/forms';

export class WorkSituationForm{
    constructor(fbx:FormBuilder){
        let fb = new FormBuilder();

        return fb.group({
            name: ['', Validators.required],
            descriptions: ['', Validators.required],
            isActive: ['']
        })
    }
}