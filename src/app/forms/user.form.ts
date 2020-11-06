import { ValidationService } from './../services/validators/validation.service';
import { NgForm, FormArray, FormBuilder, Validators, AbstractControl } from "@angular/forms";

export class UserForm {

    constructor(fb: FormBuilder) {
        return {
            username: [''],
            passw: ['', [Validators.required, Validators.maxLength(20),Validators.minLength(6)]],
            passy: ['', [Validators.required]],
            email: ['', [Validators.email]],
            firstName: [''],
            lastName: [''],
            othersName: [''],
            photoUrl: ['']
        }
    }
}
