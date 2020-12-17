import { ToastService } from 'ng-uikit-pro-standard';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../../models/main/user';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserForm } from 'app/backoffice/forms/user.form';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  public form = new UserForm(this.fb);

  public user: User = new User();

  constructor(
              private userService: UserService,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastService
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    this.userService.one(id).subscribe(user => this.user = user);

  }


  saveForm(t={}) {
    this.userService.update(this.user).subscribe(user => {

      this.toast.success('Usuário actualizado com successo', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['/backoffice/users']);
      
      console.log(user);
    })

  }
}
