import { Component, OnInit, Input } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from 'app/services/validators/validation.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  //errorMessage: string;
  @Input() control: FormControl;
  constructor() {}

  get errorMessage() {
   /* for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }
*/
    return null;
  }

  ngOnInit(): void {
  }

}
