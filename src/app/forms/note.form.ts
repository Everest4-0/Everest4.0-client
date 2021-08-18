import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import Form from './Form';

export class NoteForm extends Form {

    constructor() {
        super()
        this.fg = this.fb.group({
            descriptions: ['', Validators.required],
            title: ['', Validators.required]

        })

        this.valid = this.fg.valid
        this.dirty = this.fg.dirty
        this.controls = this.fg.controls

    }
}
