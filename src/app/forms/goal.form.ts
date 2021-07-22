import { Goal } from './../models/goal/goal';
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class GoalForm {

    constructor(that:Goal) {
        let fb=new FormBuilder()
        return fb.group({
            objectives: ['', Validators.required],
            anualGoal:['', Validators.required],
            partials: fb.array(that.partials)
        })
    }
}
