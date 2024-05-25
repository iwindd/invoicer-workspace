import { GridFilterModel, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

export interface TableFetch {
  sort: GridSortModel,
  pagination: GridPaginationModel,
  filter: GridFilterModel
}