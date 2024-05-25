import React from "react";
import * as formatter from "../../../libs/formatter";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Delete, ViewAgenda } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useInterface } from "../../../providers/InterfaceProvider";
import { paths } from "../../../config";
import { Customers, Invoice } from "../../../types/prisma";
import Datatable from "../../../components/ui/datatable";
import GridLinkAction from "../../../components/GridLinkAction";
import { Confirmation, useConfirm } from "../../../hooks/use-confirm";
import { TableFetch } from "../../../types/table";
import axios from "../../../libs/axios";

const columns = (menu: {
  onDelete: (data: Customers) => any;
}): GridColDef[] => {
  return [
    {
      field: "joinedAt",
      headerName: "วันที่เข้าร่วม",
      flex: 1,
      valueGetter: (value: Date) => formatter.date(value),
    },
    {
      field: "firstname",
      headerName: "ชื่อ",
      flex: 1,
      valueGetter: (_, row: Customers) =>
        formatter.text(`${row.firstname} ${row.lastname}`),
    },
    { field: "email", headerName: "อีเมล", flex: 1 },
    {
      field: "Invoice",
      headerName: "กำลังดำเนินการ",
      flex: 1,
      valueGetter: (value: Invoice[]) => formatter.number(value.length),
    },
    {
      field: "createdBy",
      headerName: "เพิ่มโดย",
      flex: 1,
      valueGetter: (
        _,
        { createdBy }: { createdBy: { firstname: string; lastname: string } }
      ) => `${createdBy.firstname} ${createdBy.lastname}`,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "เครื่องมือ",
      flex: 1,
      getActions: ({ row }: { row: Customers }) => [
        <GridLinkAction
          key="view"
          to={`${paths.customers}/${row.id}`}
          icon={<ViewAgenda />}
          label="ดูรายละเอียด"
          showInMenu
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Delete />}
          label="ลบ"
          onClick={menu.onDelete(row)}
          showInMenu
        />,
      ],
    },
  ];
};

const getData = async (table: TableFetch) => {
  return axios.get('/customers', {
    params: table,
  });
}

const Datagrid = () => {
  const navigate = useNavigate();
  const deleteConfirmation = useConfirm<HTMLElement>({
    title: "แจ้งเตือน",
    text: "",
    onConfirm: async (id: number) => {

    },
  });

  const Menu = {
    onDelete: React.useCallback(
      (data: Customers) => () => {
        deleteConfirmation.with(data.id);
        deleteConfirmation.setText(
          `คุณต้องการที่จะลบลูกค้า"${data.firstname} ${data.lastname}"หรือไม่?`
        );
        deleteConfirmation.handleOpen();
      },
      [deleteConfirmation]
    ),
  };

  return (
    <>
      <Datatable
        columns={columns(Menu)}
        name={"customers"}
        fetch={getData}
        height={700}
        onDoubleClick={({ row: data }: { row: Customers }) =>
          navigate(`${paths.customers}/${data.id}`)
        }
      />
      <Confirmation {...deleteConfirmation.props} />
    </>
  );
};

export default Datagrid;
