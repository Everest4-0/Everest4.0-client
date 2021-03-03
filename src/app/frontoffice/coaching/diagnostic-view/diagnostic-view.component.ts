import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-diagnostic-view',
  templateUrl: './diagnostic-view.component.html',
  styleUrls: ['./diagnostic-view.component.css']
})
export class DiagnosticViewComponent implements AfterViewInit {
  @ViewChild('radarCanvas') radarCanvas;

  @Input() public data = { labels: ['Running', 'Swimming', 'Eating'], data: [2, 3.3,1] };
  public datai = { labels: ['Running', 'Swimming', 'Eating'], data: [2, 3.3,1] };
  radarChart: any;


  ngAfterViewInit() {
    this.radarChartMethod();
  }

  radarChartMethod() {
    this.radarChart = new Chart(this.radarCanvas.nativeElement, {
      type: 'radar',
      data: {
        labels: this.data.labels,
        datasets: [{

          label: 'Diagnóstico',
          borderColor: [
            'rgba(254,0,0,.8)'
          ],
          backgroundColor: [
            'rgba(254,0,0,.1)',
          ],
          data: this.data.data
        },
        {
          label: 'Esperado',
          borderColor: [
            'rgba(7, 143, 0,1)'
          ],
          backgroundColor: [
            'rgba(7, 143, 0,.1)',
          ],
          data: [4, 4, 4]
        }],
        borderWidth: 1
      },
      options: {
        scale: {
          angleLines: {
            display: true
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 4
          }
        }
      }
    });
  }


}