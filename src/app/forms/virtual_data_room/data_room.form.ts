import { FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class DataRoomForm {

    constructor() {
        const fb = new FormBuilder();

        return fb.group({
            descriptions: ['', Validators.required],
            title: ['', Validators.required],
            files: ['']
        })
    }
}
