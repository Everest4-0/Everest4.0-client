import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class BudgetForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            value: ['', Validators.required],
            category: ['', Validators.required]
        })
    }
}
