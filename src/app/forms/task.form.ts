
import { Validators } from '@angular/forms';
import Form from './Form';

export class TaskForm extends Form {

    constructor() {
        super();
        this.fg = this.fb.group({
            descriptions: ['', Validators.required],
            revenue: ['', Validators.required],
            expenses: ['', Validators.required],
            duration: ['', Validators.required],
            dueDate: ['', Validators.required],
            observations: [],
            state: [],
        })

        this.valid = this.fg.valid
        this.dirty = this.fg.dirty
        this.controls = this.fg.controls
        this.errors = this.fg.errors
    }
}
