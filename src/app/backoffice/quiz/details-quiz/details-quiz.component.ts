import { QuizService } from './../../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from './../../../models/quiz/quiz';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-quiz',
  templateUrl: './details-quiz.component.html',
  styleUrls: ['./details-quiz.component.css']
})
export class DetailsQuizComponent implements OnInit {

  public quiz: Quiz

  constructor(private route: ActivatedRoute,
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id']

    this.quizService.one(id).subscribe(datas => this.quiz = datas)

  }

}
