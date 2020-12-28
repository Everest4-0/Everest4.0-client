import { FormBuilder } from "@angular/forms";

export class QuizForm {

    constructor() {
        let fb = new FormBuilder();
        return fb.group({
            text: [''],
            answers:fb.array([]),
            userId: ['']
        })
    }
}
