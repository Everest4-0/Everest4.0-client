import { FormBuilder, Validators } from '@angular/forms';

export class BudgetCategoryForm{

    constructor(fbx:FormBuilder){
        let fb = new FormBuilder();

        return fb.group({
            name: ['', Validators.required],
            direction: ['', Validators.required],
            descriptions: ['', Validators.required],
            isActive: ['', Validators.required]
        })
    }
} 