import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']

    this.userService.delete(id).subscribe(datas => {
      this.toast.success('Eliminado com sucesso', 'Sucesso', {
        timeOut: 5000,
        progressBar: true
      })
      this.router.navigate(['backoffice/users'])
    })
  }


}
