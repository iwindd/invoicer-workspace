"use client";
import { ButtonProps, Paper } from '@mui/material'
import { gridClasses, DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridSortDirection, GridSortModel, GridRowClassNameParams, GridCellParams, GridToolbar, DataGridProps } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import _ from 'lodash';
import { TableFetch } from '../../types/table';
import { useSearchParams } from 'react-router-dom';
import InvoiceStatusFilter from '../filters/invoice-status-filter';
import thTHGrid from '../locales/datatable';

export interface TableOption {
  title: string,
  Icon: React.FC,
  props: ButtonProps,
  onClick: () => void
}

interface Props {
  columns: GridColDef[],
  burger?: boolean,

  loading?: boolean,
  name: string,
  height?: string | number

  fetch: (payload: TableFetch, ...args: any) => any,
  bridge?: any[],

  selectRow?: number,
  setSelectRow?: React.Dispatch<React.SetStateAction<number>>,
  processRowUpdate?: (newData: any, oldData: any) => void,
  getRowClassName?: (params: GridRowClassNameParams) => string,
  getCellClassName?: (params: GridCellParams) => string,

  onDoubleClick?: (data: any) => void,
  overwrite?: DataGridProps
}

const Datatable = (props: Props) => {
  const [params] = useSearchParams();
  const [rows, setRows] = React.useState<any[]>([]);
  const [total, setTotal] = React.useState<number>(0);

  const fField = params.get('fSort') as string;
  const fSort = params.get('fFormat') as GridSortDirection;
  const fStatus = params.get('fStatus') as string;
  const fSearch = params.get('search') as string;

  const [sortModel, setSortModel] = React.useState<GridSortModel>((fField && fSort) ? [{ field: fField, sort: fSort }] : []);
  const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({ pageSize: 15, page: 0, });
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [
      ...(
        fStatus ? ([{ field: 'status', operator: 'equals', value: Number(fStatus) }]) : []
      )
    ],
    quickFilterExcludeHiddenColumns: true,
    quickFilterValues: fSearch ? fSearch.split(" ") : [],
  });

  useEffect(() => {
    setFilterModel({
      items: [
        ...(
          fStatus ? ([{ field: 'status', operator: 'equals', value: Number(fStatus) }]) : []
        )
      ],
      quickFilterExcludeHiddenColumns: true,
      quickFilterValues: fSearch ? fSearch.split(" ") : [],
    })
  }, [fSearch, fStatus, setFilterModel])

  const { data, isLoading, refetch } = useQuery({
    queryKey: [props.name],
    queryFn: async () => {
      return await props.fetch({
        sort: sortModel,
        pagination: paginationModel,
        filter: filterModel
      }, ...(props.bridge || []))
    }
  })

  React.useEffect(() => {
    refetch()
  }, [paginationModel, sortModel, filterModel, refetch])

  React.useEffect(() => {
    if (data?.success || data?.state) {
      setRows(data.data)
      setTotal(data.total)
    }
  }, [data, setRows, setTotal])

  const processRowUpdateMiddleware = (newData: any, oldData: any) => {
    if (!props.processRowUpdate) return oldData;
    if (_.isEqual(newData, oldData)) return oldData;

    return props.processRowUpdate(newData, oldData)
  }

  const columns = React.useMemo(() => (
    props.columns.map((col) => (
      col.field === 'status' ? {
        ...col,
        filterOperators: InvoiceStatusFilter,
      } : col
    ))
  ), [props.columns])

  return (
    <Paper
      sx={{
        height: props.height, width: '100%'
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={isLoading || props.loading}
        rowCount={total}
        localeText={thTHGrid}

        pageSizeOptions={[15, 30, 50, 100]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}

        sortingMode="server"
        onSortModelChange={setSortModel}

        processRowUpdate={processRowUpdateMiddleware}
        onRowDoubleClick={props.onDoubleClick}
        getRowClassName={props.getRowClassName}
        getCellClassName={props.getCellClassName}

        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={(newModel: any) => setFilterModel(newModel)}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            csvOptions: {
              utf8WithBom: true
            },
            printOptions: {
              disableToolbarButton: true
            }
          },
        }}

        sx={{
          '& .MuiDataGrid-row:last-child': {
            '& .MuiDataGrid-cell': {
              borderBottomWidth: 0,
            },
          },
          '& .MuiDataGrid-colCell': {
            backgroundColor: 'var(--mui-palette-background-level1)',
            color: 'var(--mui-palette-text-secondary)',
            lineHeight: 1,
          },
          '& .MuiDataGrid-checkboxInput': {
            padding: '0 0 0 24px',
          },
          [`& .${gridClasses.columnHeader}`]: {
            backgroundColor: 'var(--mui-palette-background-level1)',
            color: 'var(--mui-palette-text-secondary)',
          },
          [`& .text-color-primary`]: { color: 'var(--mui-palette-primary-main)' },
          [`& .text-color-secondary`]: { color: 'var(--mui-palette-secondary-dark)' },
          [`& .text-color-info`]: { color: 'var(--mui-palette-info-main)' },
          [`& .text-color-warning`]: { color: 'var(--mui-palette-warning-main)' },
          [`& .text-color-success`]: { color: 'var(--mui-palette-success-main)' },
          [`& .text-color-error`]: { color: 'var(--mui-palette-error-main)' },
        }}

        {...props.overwrite}
      />
    </Paper>
  )
}

export default Datatable