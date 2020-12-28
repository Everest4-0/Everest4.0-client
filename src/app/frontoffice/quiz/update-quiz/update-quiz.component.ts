import { Answer } from './../../../models/quiz/answer';
import { ToastService } from 'ng-uikit-pro-standard';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from './../../../services/quiz.service';
import { AuthService } from './../../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { QuizForm } from './../../../forms/quiz.form';
import { Quiz } from './../../../models/quiz/quiz';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  public form = new QuizForm()

  public quiz: Quiz = new Quiz();

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']

    this.quizService.one(id).subscribe(datas=>this.quiz=datas)
    
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
    this.quizService.update(this.quiz).subscribe(data => {
      this.toast.success('Desafio criado com sucesso', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['/me/quiz/quizes']);
    })
  }


}
