
import { Observable } from 'rxjs';
import { ValidationService } from 'app/services/validators/validation.service';
import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'form-validator',
  templateUrl: './form-validator.component.html',
  styleUrls: ['./form-validator.component.scss']
})
export class FormValidatorComponent implements OnInit {



  v;
  @Input() set value(v) {
    this.v = v
    this.validate()
    this.valid.emit({[this.formControlKey]: !!this.isValid})
  };
  @Input() rules;
  @Input() formControlKey;
  isValid;
  @Output() valid:  EventEmitter<any> = new EventEmitter<any>();
  messages = [];
  constructor(private validationService: ValidationService) { }
  ngOnInit(): void {
    this.validate()
  }

  validate() {
    this.messages = []
    debugger
    for (let r of this.rules) {
      this.isValid = ValidationService.validate()[r](this.v) 
      if (!this.isValid) {
        this.messages.push(ValidationService.getValidatorErrorMessage(r))
        break;
      }
    }
    /*this.rules.every(r => {

    })*/
  }

}
