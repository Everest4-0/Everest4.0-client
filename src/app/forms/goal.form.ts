import { Goal } from './../models/goal/goal';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
<<<<<<< HEAD

export class GoalForm {
    fb: FormGroup
    dirty:boolean
    valid:boolean
    controls:any
    constructor(that: Goal) {
        let fb=new FormBuilder()
        this.fb= fb.group({
=======
import Form from './Form';

export class GoalForm extends Form {

    constructor(that: Goal) {
        super();

        this.fg = this.fb.group({
>>>>>>> e8f43b78f9fb4d917df8b02c11b80b727013f536
            objectives: ['', Validators.required],
            anualGoal: ['', Validators.required],
            partials: this.fb.array(that.partials)
        })

<<<<<<< HEAD
        this.controls=this.fb.controls
        this.dirty=this.fb.dirty
        this.valid=this.fb.valid
=======
        this.valid = this.fg.valid
        this.dirty = this.fg.dirty
        this.controls = this.fg.controls

>>>>>>> e8f43b78f9fb4d917df8b02c11b80b727013f536
    }
}
