import { ToastService } from 'ng-uikit-pro-standard';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from './../../../services/quiz.service';
import { AuthService } from './../../../services/auth.service';
import { Quiz } from './../../../models/quiz/quiz';
import { QuizForm } from './../../forms/quiz.form';
import { Component, OnInit } from '@angular/core';
import { Answer } from 'app/models/quiz/answer';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  public form = new QuizForm()

  public quiz: Quiz = new Quiz();

  constructor(
    private auth: AuthService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    this.quiz.answers=[new Answer(),new Answer()]
    this.quiz.user = this.auth.user;

  }
  addAnswer(){
    this.quiz.answers.push(new Answer())
  }
  removeAnswer(index) {
    if (this.quiz.answers.length === 2) {
      return;
    }
    this.quiz.answers
    .splice(index, 1);
  }
  saveForm() {
    this.quizService.create(this.quiz).subscribe(data => {
      this.toast.success('Desafio criado com sucesso', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['backoffice/quizes']);
    })
  }

}
