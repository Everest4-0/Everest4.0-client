import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {

  @Input() items;

  @Output() updatePage: EventEmitter<any> = new EventEmitter<any>();

  public paginate = { total: 0, perPage: 4, pages: 0, page: 1, firstInPage: 1 };
  constructor() { }

  ngOnInit(): void {
    debugger
    this.paginate.total = this.items.length
    this.paginate.pages = Math.ceil(this.paginate.total / this.paginate.perPage)
  }

  next() {
    this.paginate.page = (this.paginate.page === this.paginate.pages ? this.paginate.page : this.paginate.page + 1)
    this.paginate.firstInPage = (this.paginate.page - 1) * 4
    this.updatePage.emit(this.paginate);
  }

  prev() {
    this.paginate.page = (this.paginate.page === 1 ? this.paginate.page : this.paginate.page - 1)
    this.paginate.firstInPage = (this.paginate.page - 1) * 4
    this.updatePage.emit(this.paginate);
  }
}
