import { Goal } from './../models/goal/goal';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import Form from './Form';

export class GoalForm extends Form {

    constructor(that: Goal) {
        super();

        this.fg = this.fb.group({
            objectives: ['', Validators.required],
            anualGoal: ['', Validators.required],
            partials: this.fb.array(that.partials)
        })

        this.valid = this.fg.valid
        this.dirty = this.fg.dirty
        this.controls = this.fg.controls

    }
}
