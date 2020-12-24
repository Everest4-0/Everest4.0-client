import { FormBuilder } from "@angular/forms";

export class QuizForm {

    constructor(fbx: FormBuilder) {
        let fb = new FormBuilder();
        return fb.group({
            text: [''],
            descriptions: [''],
            userId: ['']
        })
    }
}
