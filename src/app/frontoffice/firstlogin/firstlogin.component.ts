import { FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'app/models/user';


@Component({
  selector: 'app-firstlogin',
  templateUrl: './firstlogin.component.html',
  styleUrls: ['./firstlogin.component.scss']
})
export class FirstloginComponent implements OnInit {

  @Output() dismiss = new EventEmitter();
  public user: User = new User()
  public file: any = {}

  constructor(public auth: AuthService, private fb: FormBuilder) {
    this.user = this.auth.user;
  }

  userForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    photoUrl: [''],
    telephone: ['']
  });
  ngOnInit(): void {
    this.file.imageUrl = this.auth.user.photoUrl
  }

  close = () => this.dismiss.emit('');


  onChange(file: File) {
    if (file) {
      this.file.fileName = file.name;
      this.file.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.file.imageUrl = reader.result;
      };
    }
  }onFileDropped($event) {
    this.onChange($event[0]);
  }
}
