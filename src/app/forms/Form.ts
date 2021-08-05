import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';

export default class Form  {
    fb;
    cosntructor() {
        this.fb = new FormBuilder()
    }
}