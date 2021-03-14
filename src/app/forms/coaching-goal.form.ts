import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class CoachingGoalForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required]
        })
    }
}
