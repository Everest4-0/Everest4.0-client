import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

export default class Form {
    public fg: FormGroup;
    public fb = new FormBuilder()
    public valid: boolean;
    public dirty: boolean;
    public controls: any
    public errors: any;
    constructor() {
    }

    public validateAllFormFields() {
        Object.keys(this.fg.controls).forEach(field => {
            const control = this.fg.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof Form) {
                control.validateAllFormFields();
            }
        });
    }
}
