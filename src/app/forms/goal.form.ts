import { Goal } from './../models/goal/goal';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';

export class GoalForm {
    fb: FormGroup
    dirty:boolean
    valid:boolean
    controls:any
    constructor(that: Goal) {
        let fb=new FormBuilder()
        this.fb= fb.group({
            objectives: ['', Validators.required],
            anualGoal:['', Validators.required],
            partials: fb.array(that.partials)
        })

        this.controls=this.fb.controls
        this.dirty=this.fb.dirty
        this.valid=this.fb.valid
    }
}
