import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class CoachingDurationForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            months: ['', Validators.required],
            description: ['', Validators.required]
        })
    }
}
