import { QuizService } from './../../services/quiz.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  public desafios:Number=1;

 constructor(private quizService:QuizService) { }

  ngOnInit(): void {
    this.quizService.all({}).subscribe(quizes=>{
      this.desafios = (quizes.length>1)? quizes.length-1:quizes.length})
  }

}
