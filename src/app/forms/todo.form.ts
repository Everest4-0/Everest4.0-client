import { ToDo } from './../models/goal/todo';

import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class ToDoForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            date: [''],
            time: [''],
            descriptions:[],
        })
    }
}
