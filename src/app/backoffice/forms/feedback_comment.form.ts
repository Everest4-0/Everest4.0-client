import { FormBuilder, Validators } from '@angular/forms';

export class FeedBackCommentForm {
    constructor() {
        const fb = new FormBuilder();

        return fb.group({
            text: ['', Validators.required]
        })
    }
}
