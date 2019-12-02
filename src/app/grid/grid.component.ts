import { Component, OnInit, Input } from '@angular/core';
import { IColumn, IGrid } from './grid.interface';

@Component({
  selector: 'ang-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input('column-config') columns?: IColumn[];
  @Input('grid-conf') gridData?: IGrid;
  @Input() data?: any[];

  public gData: any[];
  isShow = false;
  constructor() {}

  ngOnInit() {
    this.columns =
      this.columns && this.columns.length > 0
        ? this.columns
        : this.gridData &&
          this.gridData.column.length > 0 &&
          this.gridData.column;
    this.columns.map(
      col =>
        (col.sortDirection = col.sortDirection ? col.sortDirection : 'none')
    );
    this.gData =
      this.columns && this.columns.length > 0 && this.data.length > 0
        ? Object.assign([], this.data)
        : this.gridData && this.gridData.data.length > 0 && this.gridData.data;
    this.setWidth();
  }

  generateChart(){
    this.isShow = true;
  }
  showChart(event) {
    this.isShow = event;
  }
  sort(column: IColumn) {
    column.sortDirection =
      column.sortDirection === 'none'
        ? 'asc'
        : column.sortDirection === 'asc'
        ? 'desc'
        : 'none';
    if (column.sortDirection !== 'none') {
      this.gData = this.gData.sort((nextfield, currentfield) =>
        this.sortData(nextfield, currentfield, column)
      );
    } else {
      this.gData = this.data;
    }
  }

  private sortData(nextfield: any, currentfield: any, column: IColumn): number {
    const nextfieldValue = nextfield[column.field];
    const currentfieldValue = currentfield[column.field];
    return column.sortDirection === 'asc'
      ? nextfieldValue > currentfieldValue
        ? 1
        : -1
      : nextfieldValue < currentfieldValue
      ? 1
      : -1;
  }

  private setWidth() {
    this.gridData = {
      width:
        this.gridData && this.gridData.width ? this.gridData.width : '1000px'
    };

    let columnlength = 0;

    this.columns.map(col => {
      if (col.width) {
        if (this.gridData.width.toString().includes('px')) {
          if (col.width.toString().includes('px')) {
            this.gridData.width = `${+this.gridData.width
              .toString()
              .split('px')[0] - +col.width.toString().split('px')[0]}${'px'}`;
          } else if (typeof col.width === 'number') {
            col.width = `${col.width.toString()}${'px'}`;
            this.gridData.width = `${+this.gridData.width
              .toString()
              .split('px')[0] - +col.width.toString()}${'px'}`;
          } else {
            col.width = undefined;
          }
        } else if (typeof this.gridData.width === 'number') {
          if (col.width.toString().includes('px')) {
            this.gridData.width = `${+this.gridData.width.toString() -
              +col.width.toString().split('px')[0]}${'px'}`;
          } else if (typeof col.width === 'number') {
            col.width = `${col.width.toString()}${'px'}`;
            this.gridData.width = `${+this.gridData.width.toString() -
              +col.width.toString()}${'px'}`;
          } else {
            col.width = undefined;
          }
        }
      }
      columnlength = col.width ? columnlength : columnlength + 1;
    });

    if (this.gridData.width.toString().includes('px')) {
      this.columns.map(col => {
        col.width = col.width
          ? col.width
          : `${(
              +this.gridData.width.toString().split('px')[0] / columnlength
            ).toString()}${'px'}`;
      });
    }
  }
}
