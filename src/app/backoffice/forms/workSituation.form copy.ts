import { FormBuilder, Validators } from '@angular/forms';

export class ActivityForm{
    constructor(){
        let fb = new FormBuilder();

        return fb.group({
            title: ['', Validators.required],
            descriptions: ['', Validators.required],
            attachment:['', Validators.required],
            duration: ['', Validators.required]
        })
    }
}