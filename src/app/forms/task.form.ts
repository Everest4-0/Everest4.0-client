import { Goal } from '../models/goal/goal';
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class TaskForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            descriptions: [''],
            revenue: [],
            expenses: [],
            state: [],
            dueDate: [],
            observations: [],

        })
    }
}
