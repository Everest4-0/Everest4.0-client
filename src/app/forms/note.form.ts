import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class NoteForm {

    constructor() {

        let fb = new FormBuilder();
        return fb.group({
            descriptions: ['', Validators.required],
            title: ['', Validators.required]

        })
    }
}
