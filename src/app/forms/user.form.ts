import { ValidationService } from './../services/validators/validation.service';
import { NgForm, FormArray, FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class UserForm {

    constructor(fb: FormBuilder) {
        return {
            username: ['', Validators.required],
            passw: ['', [Validators.required, Validators.maxLength(20),Validators.minLength(6)]],
            passy: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            othersName: [''],
            photoUrl: ['']
        }
    }
}
