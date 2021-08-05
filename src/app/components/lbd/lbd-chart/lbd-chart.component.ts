import { Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import * as Chartist from 'chartist';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  styleUrls: ['./lbd-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit, AfterViewInit {
  static currentId = 1;

  @Input()
  public title: string;

  @Input()
  public subtitle: string = '';

  @Input()
  public chartClass: string = '';

  @Input()
  public chartType: ChartType;

  @Input()
  public chartData: any = {};

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[];

  @Input()
  public footerIconClass: string = '';

  @Input()
  public footerText: string = '';

  @Input()
  public legendItems: LegendItem[];

  @Input()
  public withHr: boolean = false;

  @Input()
  public chart;

  public chartId: string = '';

  constructor() {
  }

  public ngOnInit(): void {
    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
  }

  public ngAfterViewInit(): void {
    switch (this.chartType) {
      case ChartType.Pie:
        this.chart = new Chartist.Pie(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Line:
        this.chart = new Chartist.Line(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
      case ChartType.Bar:
        this.chart = new Chartist.Bar(`#${this.chartId}`, this.chartData, this.chartOptions, this.chartResponsive);
        break;
    }
  }
}
