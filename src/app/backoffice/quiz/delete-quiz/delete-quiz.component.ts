import { ToastService } from 'ng-uikit-pro-standard';
import { QuizService } from './../../../services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-quiz',
  templateUrl: './delete-quiz.component.html',
  styleUrls: ['./delete-quiz.component.css']
})
export class DeleteQuizComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private toast: ToastService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']

    this.quizService.delete(id).subscribe(datas => {
      this.toast.success('Eliminado com sucesso', 'Sucesso', {
        timeOut: 5000,
        progressBar: true
      })
      this.router.navigate(['backoffice/quizes'])
    })
  }

}
