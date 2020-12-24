import { AuthService } from './../../../../services/auth.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { QuizService } from './../../../../services/quiz.service';
import { Quiz } from './../../../../models/quiz/quiz';
import { FormBuilder } from '@angular/forms';
import { QuizForm } from './../../../../forms/quiz.form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  public form = new QuizForm(this.fb)

  public quiz: Quiz = new Quiz();

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router) { }

  ngOnInit(): void {

    this.quiz.user = this.auth.user;

  }

  saveForm() {
    this.quizService.create(this.quiz).subscribe(data => {
      this.toast.success('Desafio criado com sucesso', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['/me/quiz/quizes']);
    })
  }

}
