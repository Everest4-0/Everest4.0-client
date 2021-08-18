import { QuizForm } from '../../forms/quiz.form';
import { Quiz } from '../../../models/quiz/quiz';
import { FormBuilder } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { Router, ActivatedRoute } from '@angular/router';
import { Answer } from '../../../models/quiz/answer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz-backoffice.component.html',
  styleUrls: ['./update-quiz-backoffice.component.scss']
})
export class UpdateQuizBackOfficeComponent implements OnInit {

  public form = new QuizForm()

  public quiz: Quiz = new Quiz();

  constructor(
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
  //TODO: GAMBIARA
  changeCorrect(id) {
    this.quiz.answers.forEach(x => x.correct = x.text === id)
  }

  
  saveForm() {
    this.quizService.update(this.quiz).subscribe(data => {
      this.toast.success('Desafio actualizado com sucesso', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
      })

      this.router.navigate(['backoffice/quizes']);
    })
  }


}
