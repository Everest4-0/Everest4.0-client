import { FormBuilder } from '@angular/forms';

export class ActivityForm{
    constructor(){
        let fb = new FormBuilder();

        return fb.group({
            title: [''],
            descriptions: [''],
            attachment:[''],
            duration: ['']
        })
    }
}