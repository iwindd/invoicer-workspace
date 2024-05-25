import React from 'react'
import * as formatter from '../../../libs/formatter'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { Delete, ViewAgenda } from '@mui/icons-material';
import { Invoice, User } from '../../../types/prisma';
import { UserData, useAuth } from '../../../providers/AuthProvider';
import { paths } from '../../../config';
import GridLinkAction from '../../../components/GridLinkAction';
import { Confirmation, useConfirm } from '../../../hooks/use-confirm';
import Datatable from '../../../components/ui/datatable';
import { useNavigate } from 'react-router-dom';

const columns = (menu: {
  onDelete: (data: User) => any;
}, session: UserData | null): GridColDef[] => {
  return [
    { field: 'createdAt', headerName: 'วันที่เพิ่ม', flex: 1, valueGetter: (value: Date) => formatter.date(value) },
    { field: 'firstname', headerName: 'ชื่อ', flex: 1, valueGetter: (_, row: User) => formatter.text(`${row.firstname} ${row.lastname}`) },
    { field: 'email', headerName: 'อีเมล', flex: 1 },
    { field: 'permission', headerName: 'สถานะ', flex: 1, valueGetter: (value: Number) => value == 1 ? "ผู้ดูแลระบบ" : "แอดมิน" },
    { field: 'Customers', headerName: 'ลูกค้าที่สร้าง', flex: 1, valueGetter: (value: User[]) => formatter.number(value.length) },
    { field: 'Invoice', headerName: 'บิลที่ออกทั้งหมด', flex: 1, valueGetter: (value: Invoice[]) => formatter.number(value.length) },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'เครื่องมือ',
      flex: 1,
      getActions: ({ row }: { row: User }) => [
        <GridLinkAction key="view" to={`${paths.admin}/${row.id}`} icon={<ViewAgenda />} label="ดูรายละเอียด" showInMenu />,
        ...(
          Number(session?.id) == row.id ? [] : [<GridActionsCellItem key="delete" icon={<Delete />} label="ลบ" onClick={(menu.onDelete(row))} showInMenu />,]
        )
      ],
    }
  ]
}

const Datagrid = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const deleteConfirmation = useConfirm<HTMLElement>({
    title: "แจ้งเตือน",
    text: "",
    onConfirm: async (id: number) => {

    }
  })

  const Menu = {
    onDelete: React.useCallback((data: User) => () => {
      deleteConfirmation.with(data.id)
      deleteConfirmation.setText(`คุณต้องการที่จะลบแอดมิน"${data.firstname} ${data.lastname}"หรือไม่?`)
      deleteConfirmation.handleOpen();
    }, [deleteConfirmation]),
  }

  return (
    <>
      <Datatable
        columns={columns(Menu, userData)}
        name={'admins'}
        fetch={() => []}
        height={700}
        onDoubleClick={
          ({ row: data }: { row: User }) => navigate(`${paths.admin}/${data.id}`)
        }
      />
      <Confirmation {...deleteConfirmation.props} />
    </>
  )
}

export default Datagrid