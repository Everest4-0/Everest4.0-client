import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class CoachingSubscriptionForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            description: ['', Validators.required],
            userId: ['', Validators.required],
            durationId: ['', Validators.required],
            goalId: ['', Validators.required]
        })
    }
}
