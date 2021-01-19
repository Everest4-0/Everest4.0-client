import { FormBuilder, Validators } from '@angular/forms';

export class CourseForm {
    constructor() {
        const fb = new FormBuilder();

        return fb.group({
            title: ['', Validators.required],
            descriptions: ['', Validators.required],
            durations: ['', Validators.required],

            evaluations: ['', Validators.required],
            level: ['', Validators.required],
            language: ['', Validators.required],
            roles: ['', Validators.required],

            isActive: ['', Validators.required],
            cover: ['', Validators.required],
            modules: fb.array([])
        })
    }
}
