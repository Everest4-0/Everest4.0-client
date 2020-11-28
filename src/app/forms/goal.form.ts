import { Goal } from './../models/goal/goal';
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class GoalForm {

    constructor(fb: FormBuilder, that:Goal) {
        return fb.group({
            objectives: [''],
            anualGoal:[],
            partials: fb.array(that.partials)
        })
    }
}
