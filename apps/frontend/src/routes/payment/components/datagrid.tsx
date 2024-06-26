import React from 'react'
import * as formatter from '../../../libs/formatter'
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid'
import { DeleteTwoTone, EditTwoTone, ToggleOnTwoTone } from '@mui/icons-material';
import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import EditDialog from './edit';
import { Payment } from '../../../types/prisma';
import { banks } from '../../../config';
import { useInterface } from '../../../providers/InterfaceProvider';
import { useDialog } from '../../../hooks/use-dialog';
import { Confirmation, useConfirm } from '../../../hooks/use-confirm';
import Datatable from '../../../components/ui/datatable';
import axios from '../../../libs/axios';
import { TableFetch } from '../../../types/table';

const columns = (menu: {
  onEdit: (data: Payment) => any;
  onDelete: (data: Payment) => any;
  onActive: (data: Payment) => any;
}): GridColDef[] => {
  return [
    { field: 'active', headerName: 'สถานะ', flex: 1, valueGetter: (value: boolean) => value ? "กำลังใช้งาน" : "ไม่ถูกใช้งาน" },
    { field: 'title', headerName: 'ชื่อบัญชี', flex: 1, valueGetter: (value, row) => formatter.text(value) },
    { field: 'account', headerName: 'หมายเลขบัญชี', flex: 1, valueGetter: (value) => value },
    { field: 'createdAt', headerName: 'วันที่เพิ่ม', flex: 1, valueGetter: (value: Date) => formatter.date(value) },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'เครื่องมือ',
      flex: 1,
      getActions: ({ row }: { row: Payment }) => [
        <GridActionsCellItem key="view" icon={<EditTwoTone />} label="แก้ไข" onClick={(menu.onEdit(row))} showInMenu />,
        ...(
          !row.active ? (
            [
              <GridActionsCellItem key="delete" icon={<DeleteTwoTone />} label="ลบ" onClick={(menu.onDelete(row))} showInMenu />,
              <GridActionsCellItem key="active" icon={<ToggleOnTwoTone />} label="เปิดใช้งาน" onClick={(menu.onActive(row))} showInMenu />
            ]
          ) : []
        )
      ],
    }
  ]
}

const getData = async (table: TableFetch) => {
  return axios.get("/payment", {
    params: table,
  });
};

const Datagrid = () => {
  const { enqueueSnackbar } = useSnackbar();
  const editDialog = useDialog<HTMLDivElement>();
  const [payment, setPayment] = React.useState<Payment | null>(null);
  const { setBackdrop } = useInterface();
  const queryClient = useQueryClient();

  const confirmation = useConfirm<HTMLElement>({
    title: "แจ้งเตือน",
    text: "",
    onConfirm: async (id: number) => {
      try {
        setBackdrop(true);
        const resp = await axios.delete(`/payment/${id}`);
  
        if (resp.status == 200) {
          await queryClient.refetchQueries({ queryKey: ['payments'], type: 'active' })
          enqueueSnackbar("ลบวิธีการชำระเงินสำเร็จ!", {
            variant: "success",
          });
        }else{
          throw Error(resp.statusText)
        }
      } catch (error) {
        enqueueSnackbar("มีบางอย่างผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!", {
          variant: "error",
        });
      } finally {
        setBackdrop(false);
      }
    }
  })

  const Menu = {
    onEdit: React.useCallback((data: Payment) => () => {
      setPayment(data)
      editDialog.handleOpen()
    }, [editDialog, setPayment]),
    onDelete: React.useCallback((data: Payment) => () => {
      if (data.active) {
        return enqueueSnackbar("ไม่สามารถลบบัญชีที่กำลังใช้งานได้", { variant: "error" })
      }

      confirmation.with(data.id)
      confirmation.setText(`คุณต้องการที่จะลบบัญชีนี้หรือไม่?`)
      confirmation.handleOpen();
    }, [confirmation, enqueueSnackbar]),
    onActive: React.useCallback((data: Payment) => async () => {
      try {
        setBackdrop(true);
        const resp = await axios.patch(`/payment/${data.id}`, {
          active: true
        });
  
        if (resp.status == 200) {
          await queryClient.refetchQueries({ queryKey: ['payments'], type: 'active' })
          enqueueSnackbar("เปิดใช้งานบัญชีนี้สำเร็จ!", {
            variant: "success",
          });
        }else{
          throw Error(resp.statusText)
        }
      } catch (error) {
        enqueueSnackbar("มีบางอย่างผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!", {
          variant: "error",
        });
      } finally {
        setBackdrop(false);
      }
    }, []),
  }

  return (
    <>
      <Datatable
        columns={columns(Menu)}
        name={'payments'}
        fetch={getData}
        height={700}
        getCellClassName={(params) => params.field == 'active' ? `text-color-${params.row.active ? "primary" : "secondary"}` : ""}
      />

      <EditDialog onClose={editDialog.handleClose} onOpen={editDialog.handleOpen} open={editDialog.open} payment={payment} />
      <Confirmation {...confirmation.props} />
    </>
  )
}

export default Datagrid