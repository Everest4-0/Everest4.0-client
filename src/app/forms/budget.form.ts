import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import Form from "./Form";

export class BudgetForm extends Form {

    constructor() {
        super();

        this.fb = new FormBuilder()
        return this.fb.group({
            value: ['', Validators.required],
            category: ['', Validators.required]
        })
    }

}
