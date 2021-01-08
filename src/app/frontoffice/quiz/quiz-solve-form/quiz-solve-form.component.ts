import { StorageService } from 'ngx-webstorage-service';
import { Quiz } from './../../../models/quiz/quiz';
import { QuizService } from './../../../services/quiz.service';
import { ToastService } from 'ng-uikit-pro-standard';
import { ModalService } from 'app/components/modal';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-quiz-solve-form',
  templateUrl: './quiz-solve-form.component.html',
  styleUrls: ['./quiz-solve-form.component.scss']
})
export class QuizSolveFormComponent implements OnInit {

  public quizes: Array<Quiz> = [];
  public quiz: Quiz = new Quiz();
  public quizIndex = 0
  public counter = 31

  constructor(private modalService: ModalService,
    private toast: ToastService,
    private quizService: QuizService,
    /*private storageService: StorageService*/) { }

  ngOnInit(): void {
    this.quizService.all({}).subscribe(quizes => {
      this.quizes = quizes

      //if (this.solveQuiz())
      this.openQuiz()
    })
  }

  verifyCorrect(answer) {
      (answer)? this.quizSuccess() :
                this.quizError()
  }

  quizSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Acertou!',
      showConfirmButton: false,
      timer: 999
    })
    
    this.nextQuiz()
  }

  quizError() {
    Swal.fire({
      icon: 'error',
      title: 'Errou!',
      showConfirmButton: false,
      timer: 999
    })
    this.nextQuiz()
  }

  openQuiz() {
    this.modalService.open('solve-quiz')
  }

  solveQuizForm() {

    //this.storageService.set('solve_quiz', true);

    this.modalService.close('solve-quiz')

    this.modalService.open('solve-quiz-form')

    this.nextQuiz()

    this.quizIndex = 1
  }

  nextQuiz() {
    if (this.quizIndex < 5) {

      this.getQuiz()

      return this.counter
    }

    return this.counter = 0
  }

  getQuiz() {
    let index = Math.floor(Math.random() * this.quizes.length)

    this.quiz = this.quizes[index]

    this.quizes.splice(index, 1)

    this.quizIndex++

  }

  discard() {
    this.modalService.close('solve-quiz')
    this.modalService.close('solve-quiz-form')
    //this.storageService.set('solve_quiz', false);
  }
}
