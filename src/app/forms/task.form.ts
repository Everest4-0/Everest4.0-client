import { Goal } from '../models/goal/goal';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

export class TaskForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            descriptions: ['', {
                validators: [
                    Validators.required,
                ],
                updateOn: 'blur'
            }],
            revenue: ['', Validators.required,],
            expenses: ['', Validators.required],
            state: [],
            duration: ['', Validators.required],
            dueDate: ['', Validators.required],
            observations: [],
        })
    }
}
