import { StorageServices } from './../../../services/storage.service';
import { AnsweredQuiz } from './../../../models/quiz/answeredQuiz';
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
  public answeredQuiz: AnsweredQuiz = new AnsweredQuiz()
  public answeredQuizes: Array<AnsweredQuiz> = [];

  public quiz: Quiz = new Quiz();
  public quizIndex = 0
  public counter = 31

  constructor(private modalService: ModalService,
    private toast: ToastService,
    private quizService: QuizService,
    private storageService: StorageServices) { }

  ngOnInit(): void {
    const solve = (this.storageService.get('solve_quiz'))

    this.quizService.all({rand:true, limit:5}).subscribe(quizes => {
      this.quizes = quizes

      alert(quizes.length)

      if (solve.data === undefined)
        this.openQuiz()

    })
  }

  openQuiz() {
    this.modalService.open('solve-quiz')
  }

  solveQuizForm() {

    this.modalService.close('solve-quiz')

    this.modalService.open('solve-quiz-form')

    this.storageService.remove('solve_quiz');

    this.nextQuiz()

    this.quizIndex = 1
  }

  nextQuiz() {
    if (this.quizIndex < 5) {

      this.getQuiz()

      this.quizIndex++

      return this.counter
    } else if (this.quizIndex == 5)
      this.quizIndex++

    return this.counter = 0
  }

  getQuiz() {
    let index = Math.floor(Math.random() * this.quizes.length)

    this.quiz = this.quizes[index]

    this.quizes.splice(index, 1)
  }

  verifyCorrect(answer) {
    (answer) ? this.quizSuccess() :
      this.quizError()
  }

  addAnswersQuiz(correct: boolean) {
    this.answeredQuiz = { quiz: this.quiz, isCorrect: correct }
    let lenth = this.answeredQuizes.push(this.answeredQuiz)

    if (lenth == 5)
      this.storageService.save('solve_quiz', true);

  }
  verificateAnswerQuiz(quiz) {
    let text = ''
    quiz.answers.forEach(ans => (ans.correct) ? text = ans.text : '')

    return text
  }
  quizSuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Acertou!',
      showConfirmButton: false,
      timer: 999
    })

    this.addAnswersQuiz(true)

    this.nextQuiz()
  }

  quizError() {
    Swal.fire({
      icon: 'error',
      title: 'Errou!',
      showConfirmButton: false,
      timer: 999
    })

    this.addAnswersQuiz(false)

    this.nextQuiz()
  }

  discard() {
    this.modalService.close('solve-quiz')
    this.modalService.close('solve-quiz-form')
    this.storageService.save('solve_quiz', true);
  }
}

