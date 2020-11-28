import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() rating = 0;
  @Input() max = 5;
  @Output() change = new EventEmitter();

  //private readonly MAX_NUMBER_OF_STARS = 5;

  constructor() { }

  ngOnInit(): void {
    this.rating = 0
  }

  private get numberOfFullStars(): number {
    return Math.floor(this.rating);
  }

  addStar(i) {
    debugger
    this.rating = (this.rating*1) + i + 1;
    this.change.emit(this.rating)
  }

  removeStar(i) {
    this.rating -= this.rating - i - 1;
    this.change.emit(this.rating)
  }
  private get numberOfEmptyStars(): number {
    return this.max - Math.ceil(this.rating);
  }

  get fullStars(): any[] {
    return Array(this.numberOfFullStars);
  }

  get emptyStars(): any[] {
    return Array(this.numberOfEmptyStars);
  }

  get hasAnHalfStar(): boolean {
    return this.rating % 1 !== 0;
  }
}
