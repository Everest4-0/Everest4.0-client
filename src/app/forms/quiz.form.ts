import { FormBuilder} from "@angular/forms";

export class QuizForm {

    constructor(fb: FormBuilder) {
        return fb.group({
            text: [''],
            description:[''],
            userId: ['']
        })
    }
}
