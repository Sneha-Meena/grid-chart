export interface IGrid {
  column?: IColumn[];
  data?: any[];
  height?: string | number;
  width?: string | number;
}

export interface IColumn {
  field: string;
  columnName: string;
  width?: string | number;
  sortDirection?: 'asc' | 'desc' | 'none';
}
