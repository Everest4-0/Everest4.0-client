import { AuthService } from './../../../services/auth.service';
import { QuizService } from '../../../services/quiz.service';
import { Component, OnInit } from '@angular/core';
import { Quiz } from 'app/models/quiz/quiz';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.css']
})
export class ListQuizComponent implements OnInit {

  public quizes: Array<Quiz>=[];
  
  constructor(private quizService:QuizService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.quizService.all({}).subscribe(quizes=>
      {
        quizes.forEach(quiz => {
          if(quiz.user.id==this.auth.user.id)
            this.quizes.push(quiz); 
        })
      })
  }

}
