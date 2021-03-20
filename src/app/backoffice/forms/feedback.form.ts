import { FormBuilder, Validators } from '@angular/forms';

export class FeedBackForm {
    constructor() {
        const fb = new FormBuilder();

        return fb.group({
            descriptions: ['', Validators.required],
            points: fb.array([])
        })
    }
}
