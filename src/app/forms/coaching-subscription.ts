import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class CoachingSubscriptionForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            description: ['', Validators.required],
            user: ['', Validators.required],
            duration: ['', Validators.required],
            goal: ['', Validators.required]
        })
    }
}
