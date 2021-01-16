import { FormBuilder, Validators } from "@angular/forms";

export class QuizForm {

    constructor() {
        let fb = new FormBuilder();
        return fb.group({
            text: ['', Validators.required],
            isActive:[''],
            answers:fb.array([]),
            userId: ['']
        })
    }
}
