import { FormBuilder } from "@angular/forms";

export class EvaluationRequestForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            requested: [''],
            relationId: [''],
        })
    }
}
