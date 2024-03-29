import { GroupByPipe } from './group-by.pipe';
import { ArrSumPipe } from './arr-sum.pipe';
import { ArrFilterPipe } from './arr-filter.pipe';
import { ArrSortPipe } from './arr-sort.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecondsToTimePipe } from './seconds-to-time.pipe';



@NgModule({
  declarations: [
    GroupByPipe,
    ArrSumPipe,
    ArrFilterPipe,
    ArrSortPipe,
    SecondsToTimePipe
  ],
  exports: [
    GroupByPipe,
    ArrSumPipe,
    ArrFilterPipe,
    ArrSortPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
