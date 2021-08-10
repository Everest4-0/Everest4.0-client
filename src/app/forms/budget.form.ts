import { Validators } from '@angular/forms';
import Form from './Form';

export class BudgetForm extends Form {

    constructor() {
        super();

        this.fg = this.fb.group({
            value: ['', Validators.required],
            category: ['', Validators.required]
        })
        this.valid = this.fg.valid
        this.dirty = this.fg.dirty
        this.controls = this.fg.controls

    }

}
