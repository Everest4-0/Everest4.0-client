import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from './../../../components/modal/modal.service';
import { QuizForm } from './../../../backoffice/forms/quiz.form';
import { ToastService } from 'ng-uikit-pro-standard';
import { AuthService } from './../../../services/auth.service';
import { QuizService } from '../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'app/models/quiz/quiz';
import { Answer } from 'app/models/quiz/answer';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {

  public form = new QuizForm()
  public quizzes: Array<Quiz> = [new Quiz()];
  public quiz: Quiz = new Quiz();

  constructor(
    private quizService: QuizService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router,
    public modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.quizService.all({ userId: this.auth.user.id }).subscribe(quizzes => this.quizzes = quizzes)
  }

  get correct() {
    let t = this.quiz.answers.filter(x => x.correct)[0];
    if (t) {
      return t.users.length
    }
    return 0
  };
  get wrong() { return this.quiz.answers.filter((x) => !x.correct).reduce((x, y) => x + y.users.length, 0) };

  addAnswer() {
    this.quiz.answers.push(new Answer())
  }
  removeAnswer(index) {
    if (this.quiz.answers.length === 2) {
      return;
    }
    this.quiz.answers
      .splice(index, 1);
  }

  changeCorrect(id) {
    this.quiz.answers.forEach(x => x.correct = x.text === id)
  }
  saveForm() {
    this.quiz.isActive=false;
    (this.quiz.id ?
      this.quizService.update(this.quiz) :
      this.quizService.create(this.quiz))
      .subscribe(quiz => {
        if (this.quiz.id) {
          this.quizzes.filter(q => q.id === quiz.id)[0] = quiz
        } else {
          this.quizzes.push(quiz)
        }

        this.toast.success('Desafio ' + (this.quiz.id ? 'Actualizado' : 'criado') + ' com sucesso', 'Sucesso', {
          timeOut: 5000,
          progressBar: true,
        })

        this.modalService.close('form-quiz-modal');
        this.reload();

      })
  }

  createQuiz() {
    //debugger
    this.quiz = new Quiz()
    this.quiz.answers = [new Answer(true), new Answer()]
    this.quiz.user = this.auth.user
    this.modalService.open('form-quiz-modal');
  }

  updateQuiz(quiz: Quiz) {
    this.quiz = quiz
    this.modalService.open('form-quiz-modal');
  }

  deleteQuiz(quiz: Quiz){
    this.quizService.delete(quiz.id).subscribe(datas => {
      this.toast.success('Eliminado com sucesso', 'Sucesso',{
        timeOut:5000,
        progressBar:true
      })
      this.reload()
    })
  }
  
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], { relativeTo: this.route });
  }

}
