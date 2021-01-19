import { FormBuilder, Validators } from "@angular/forms";

export class EvaluationForm {

    constructor(fbx: FormBuilder) {
        let fb=new FormBuilder();
        return fb.group({
            name: ['', Validators.required],
            group: ['', Validators.required],
            descriptions: ['', Validators.required],
            isActive: ['', Validators.required]
        })
    }
}
