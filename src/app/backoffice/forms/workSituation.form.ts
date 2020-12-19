import { FormBuilder } from '@angular/forms';

export class WorkSituationForm{
    constructor(fbx:FormBuilder){
        let fb = new FormBuilder();

        return fb.group({
            name: [''],
            descriptions: [''],
            isActive: ['']
        })
    }
}