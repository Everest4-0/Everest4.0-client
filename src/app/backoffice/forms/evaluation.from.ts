import { FormBuilder } from "@angular/forms";

export class EvaluationForm {

    constructor(fbx: FormBuilder) {
        let fb=new FormBuilder();
        return fb.group({
            name: [''],
            group: [''],
            descriptions: [''],
            isActive: ['']
        })
    }
}
