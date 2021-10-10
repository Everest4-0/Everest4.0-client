import { AcademicLevelService } from './../../../services/data/academic-level.service';
import { Component, OnInit } from '@angular/core';
import { AcademicLevel } from 'app/models/backoffice/academicLevel.model';

@Component({
  selector: 'app-list-academic-level',
  templateUrl: './list-academic-level.component.html',
  styleUrls: ['./list-academic-level.component.css']
})
export class ListAcademicLevelComponent implements OnInit {

  public academicLevels: Array<AcademicLevel> = [];
  public academicLevelsPaginated: Array<AcademicLevel> = []

  onChangePage = (academicLevelsPaginated) => this.academicLevelsPaginated = academicLevelsPaginated;

  constructor(private academicLevelService: AcademicLevelService) { }

  ngOnInit(): void {
    this.academicLevelService.all({}).subscribe(levels=>this.academicLevels=levels);
  }

}
