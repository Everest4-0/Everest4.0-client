import { FormBuilder } from '@angular/forms';

export class BudgetCategoryForm{

    constructor(fbx:FormBuilder){
        let fb = new FormBuilder();

        return fb.group({
            name: [''],
            direction: [''],
            descriptions: [''],
            isActive: ['']
        })
    }
} 