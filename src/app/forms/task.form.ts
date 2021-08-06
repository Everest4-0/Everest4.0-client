
import { Validators } from '@angular/forms';
import Form from './Form';

export class TaskForm extends Form {

    constructor() {
        super();
        this.fg = this.fb.group({
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

        this.valid = this.fg.valid
        this.dirty = this.fg.dirty
        this.controls = this.fg.controls
    }
}
