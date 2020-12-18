import { FormBuilder } from '@angular/forms';

export class BudgetCategoryForm{

    constructor(fbx:FormBuilder){
        let fb = new FormBuilder();

        fb.group({
            name: [''],
            direction: [''],
            descriptions: [''],
            isActive: ['']
        })
    }
} 