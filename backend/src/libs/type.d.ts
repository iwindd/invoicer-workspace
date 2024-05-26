declare enum LogicOperator {
  And = "and",
  Or = "or"
}
export type SortDirection = 'asc' | 'desc' | null | undefined;
export interface SortItem {
  field: string;
  sort: SortDirection;
}

export interface Pagination{
  pageSize: number;
  page: number;
}

export interface Filter{
  items: {
    id?: number | string;
    field: string;
    value?: any;
    operator: string;
  }[],
  logicOperator?: LogicOperator;
  quickFilterValues?: any[];
  quickFilterLogicOperator?: LogicOperator;
  quickFilterExcludeHiddenColumns?: boolean;
}

export interface TableFetch{
  sort: SortItem[],
  pagination: Pagination,
  filter: Filter,
  target?: string
}