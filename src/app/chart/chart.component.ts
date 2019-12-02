import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IColumn, IGrid } from './chart.interface';

@Component({
  selector: 'ang-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input('column-config') columns?: IColumn[];
  @Input() data?: any[];
  @Input() isShow: boolean;
  @Output() showEvent: EventEmitter<boolean> = new EventEmitter();
  isShowButton: boolean;
  public SystemName: string = 'MF1';
  firstCopy = false;

  // data
  public lineChartData: Array<number> = [];

  public labelMFL: Array<any> = [
    { data: this.lineChartData, label: this.SystemName }
  ];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            max: 20,
            min: 0
          }
        }
      ],
      xAxes: [{}]
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'top',
        anchor: 'end',
        color: '#222',

        font: {
          family: 'FontAwesome',
          size: 14
        }
      },
      deferred: false
    }
  };

  _lineChartColors: Array<any> = [
    {
      backgroundColor: 'red',
      borderColor: 'red',
      pointBackgroundColor: 'red',
      pointBorderColor: 'red',
      pointHoverBackgroundColor: 'red',
      pointHoverBorderColor: 'red'
    }
  ];
  // labels
  public lineChartLabels: any = [];
  public ChartType = 'bar';

  ngOnInit() {
    this.isShowButton = this.isShow;
    this.data.forEach(data => {
      this.lineChartLabels.push(data.name);
      this.lineChartData.push(data.weight);
    });
  }
  constructor() {}

  close() {
    this.isShow = false;
    this.showEvent.emit(false);
  }

  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
}
