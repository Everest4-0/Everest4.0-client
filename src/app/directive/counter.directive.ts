import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy
} from "@angular/core";

import { Subject, Observable, Subscription, timer } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";

@Directive({
  selector: "[counter]"
})
export class CounterDirective implements OnChanges, OnDestroy {
  private _counterSource$ = new Subject<any>();
  private _subscription = Subscription.EMPTY;

  @Input() counter: number;
  @Input() times: number = 10;
  @Input() interval: number = 1;
  @Output() value = new EventEmitter<number>();
  @Output() zeroCb = new EventEmitter();

  constructor() {
    this._subscription = this._counterSource$
      .pipe(
        switchMap(({ interval, count, times, counter }) =>
          timer(0, interval).pipe(
            take(count * times),
            tap(() => {
              if (count === 0 && times > 0) {
                --times;
                count = counter;
              }
              return this.value.emit(--count)
            })
          )
        )
      )
      .subscribe();
  }

  ngOnChanges() {
    this._counterSource$.next({
      count: this.counter,
      counter: this.counter,
      times: this.times,
      interval: this.interval * 1000
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
