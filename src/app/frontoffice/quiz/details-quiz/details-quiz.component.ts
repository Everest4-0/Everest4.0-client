import { Quiz } from './../../../models/quiz/quiz';
import { Answer } from './../../../models/quiz/answer';
import { AnswerService } from './../../../services/answer.service';
import { QuizService } from './../../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-quiz',
  templateUrl: './details-quiz.component.html',
  styleUrls: ['./details-quiz.component.css']
})
export class DetailsQuizComponent implements OnInit {

  //public answer: Array<Answer>=[]
  public quiz: Quiz

  constructor(private route: ActivatedRoute,
              private quizService: QuizService,
              private answerService: AnswerService,
              ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']

    this.quizService.one(id).subscribe(datas => this.quiz=datas)

  }

}
