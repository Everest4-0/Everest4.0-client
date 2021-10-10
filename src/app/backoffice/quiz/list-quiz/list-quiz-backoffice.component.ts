import { AuthService } from '../../../services/auth.service';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz/quiz';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz-backoffice.component.html',
  styleUrls: ['./list-quiz-backoffice.component.css']
})
export class ListQuizBackOfficeComponent implements OnInit {

  public quizes: Array<Quiz> = [];
  public quizesPaginated: Array<Quiz> = []

  onChangePage = (users) => this.quizesPaginated = users;

  constructor(private quizService: QuizService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.quizService.all({}).subscribe(quizes =>{
      this.quizes = quizes

      console.log(quizes)
    })
  }

}
