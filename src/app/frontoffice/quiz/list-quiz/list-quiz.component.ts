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
  
  constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.all({}).subscribe(quizes=>{this.quizes=quizes; console.log(this.quizes)})

    
  }

}
