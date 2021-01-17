import { Goal } from '../models/goal/goal';
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class TaskForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            descriptions: ['', Validators.required],
            revenue: [],
            expenses: [],
            state: [],
            duration: [],
            dueDate: [],
            observations: [],

        })
    }
}
