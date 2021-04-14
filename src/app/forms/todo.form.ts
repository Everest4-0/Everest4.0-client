import { ToDo } from './../models/goal/todo';

import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class ToDoForm {

    constructor(fb: FormBuilder = null) {
        fb = new FormBuilder()
        return fb.group({
            subject: [''],
            startDate: [''],
            startTime: [''],
            endTime: [''],
            descriptions: [],
        })
    }
}
