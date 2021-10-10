import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-backoffice-navbar',
  templateUrl: './backoffice-navbar.component.html',
  styleUrls: ['./backoffice-navbar.component.scss']
})
export class BackofficeNavbarComponent implements OnInit {

  @Input() title;
  @Input() create = true;

  public url;
  public id;
  public list;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    
    this.url = '/' + this.router.url.split('/').splice(1, 2).join('/')
    this.id = this.route.snapshot.paramMap.get("id");
    this.list = this.router.url.split('/').length === 3
  }


  goBack = () => this.location.back();
}
