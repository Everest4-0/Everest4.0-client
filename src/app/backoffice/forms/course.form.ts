import { FormBuilder } from '@angular/forms';

export class CourseForm {
    constructor() {
        const fb = new FormBuilder();

        return fb.group({
            title: [''],
            descriptions: [''],
            durations: [''],

            evaluations: [''],
            level: [''],
            language: [''],

            isActive: [''],
            cover: [''],
            modules: fb.array([])
        })
    }
}
