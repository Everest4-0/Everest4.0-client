import { AuthService } from './../../../services/auth.service';
import { QuizService } from './../../../services/quiz.service';
import { Quiz } from './../../../models/quiz/quiz';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {

  public quizes: Array<Quiz> = [];

  constructor(private quizService: QuizService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.quizService.all({}).subscribe(quizes =>
      this.quizes = quizes
    )
  }

}
