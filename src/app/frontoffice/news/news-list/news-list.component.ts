import { NewsService } from './../../../services/news.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-news',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  bingNews: any = {};
  news: [];


  public show: boolean = true;

  public type: string = 'component';

  public disabled: boolean = false;

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.newsService.all({}).subscribe(news => {
       this.bingNews = news;
       this.news = news.articles//.value.filter(x => x.image !== undefined)
       })
  }

  getThumbnails(item: any) {
    try {
      return item.image.thumbnail.contentUrl
    } catch (e) {
      return '';
    }
  }

}
