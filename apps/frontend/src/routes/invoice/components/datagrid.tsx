import { CancelTwoTone, CreditCardTwoTone, EditTwoTone, PeopleTwoTone, PrintTwoTone } from '@mui/icons-material';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import * as formatter from '../../../libs/formatter';
import React from 'react'
import { condition } from '../../../libs/utils';
import dayjs from '../../../libs/dayjs';
import ViewDialog from './view';
import EditDialog from './edit';
import { Customers, Invoice } from '../../../types/prisma';
import { paths } from '../../../config';
import GridLinkAction from '../../../components/GridLinkAction';
import { useDialog } from '../../../hooks/use-dialog';
import { Confirmation, useConfirm } from '../../../hooks/use-confirm';
import Datatable from '../../../components/ui/datatable';
import { TableFetch } from '../../../types/table';
import axios from '../../../libs/axios';
import { useInterface } from '../../../providers/InterfaceProvider';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

const columns = (actions: {
  edit: (row: Invoice) => any,
  cancel: (row: Invoice) => any,
  payment: (row: Invoice) => any,
  denypayment: (row: Invoice) => any
}): GridColDef[] => {
  return [
    { field: 'status', filterable: true, headerName: 'สถานะ', flex: 1, valueGetter: (_, row: Invoice) => formatter.invoice_(row) },
    { field: 'note', filterable: true, headerName: 'หมายเหต', flex: 1, valueGetter: (value: string) => formatter.text(value)},
    { field: 'items', filterable: false, headerName: 'จำนวน', flex: 1, valueGetter: (payload: string) => formatter.money((JSON.parse(payload) as Invoice[]).reduce((p, i) => p + (i.amount * i.price), 0)) },
    { field: 'start', filterable: false, headerName: 'วันที่เริ่ม', flex: 1, valueGetter: (date: Date) => formatter.date2(date) },
    { field: 'end', filterable: false, headerName: 'วันครบกำหนด', flex: 1, valueGetter: (date: Date) => formatter.date2(date) },
    { field: 'owner', filterable: false, headerName: 'ลูกค้า', flex: 1, valueGetter: ({ firstname, lastname }: Customers) => `${firstname} ${lastname}` },
    { field: 'createdBy', filterable: false, headerName: 'เพิ่มโดย', flex: 1, valueGetter: (_, { createdBy }: { createdBy: { firstname: string, lastname: string } }) => `${createdBy.firstname} ${createdBy.lastname}` },
    { field: 'createdAt', filterable: false, headerName: 'วันที่เพิ่ม', flex: 1, valueGetter: (value: Date) => dayjs(value).fromNow() },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'เครื่องมือ',
      flex: 1,
      getActions: ({ row }: { row: Invoice }) => [
        <GridLinkAction key="print" to={`${paths.invoice}/${row.id}`} icon={<PrintTwoTone />} label="พิมพ์" showInMenu />,
        <GridLinkAction key="print" to={`${paths.customers}/${row.ownerId}`} icon={<PeopleTwoTone />} label="ดูลูกค้า" showInMenu />,
        ...(row.status == 0 ? (
          [
            <GridActionsCellItem key="edit" icon={<EditTwoTone />} label="แก้ไข" onClick={(actions.edit(row as Invoice))} showInMenu />,
            <GridActionsCellItem key="delete" icon={<CancelTwoTone />} label="ยกเลิกบิล" onClick={(actions.cancel(row))} showInMenu />,
            <GridActionsCellItem key="payment" icon={<CreditCardTwoTone />} label="ชำระบิลแล้ว" onClick={(actions.payment(row))} showInMenu />,
          ]
        ) : row.status == 1 ? (
          [
            <GridActionsCellItem key="denypayment" icon={<CreditCardTwoTone />} label="ยกเลิกการชำระบิล" onClick={(actions.denypayment(row))} showInMenu />,
          ]
        ) : [])
      ],
    }
  ]
}

const getData = async (table: TableFetch) => {
  return axios.get("/invoice", {
    params: table,
  });
};

const Datagrid = () => {
  const viewDialog = useDialog<HTMLElement>();
  const editDialog = useDialog<HTMLElement>();
  const [invoice, setInvoice] = React.useState<Invoice | null>(null);
  const { setBackdrop } = useInterface();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const onView = ({ row }: { row: Invoice }) => {
    setInvoice(row); viewDialog.handleOpen();
  }

  const cancelConfirm = useConfirm<HTMLElement>({
    title: "แจ้งเตือน",
    text: "คุณต้องการที่จะยกเลิกบิลนี้หรือไม่?",
    onConfirm: async (id: string) => {
      try {
        setBackdrop(true);
        const resp = await axios.patch(`/invoice/${id}`, {
          status: -1
        });
  
        if (resp.status == 200) {
          await queryClient.refetchQueries({
            queryKey: ["invoicesall"],
            type: "active",
          });
          enqueueSnackbar("ยกเลิกบิลสำเร็จ!", {
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
    },
  });

  const paymentConfirm = useConfirm<HTMLElement>({
    title: "แจ้งเตือน",
    text: "คุณต้องการที่จากตั้งสถานะเป็นชำระแล้วหรือไม่?",
    onConfirm: async (id: string) => {
      try {
        setBackdrop(true);
        const resp = await axios.patch(`/invoice/${id}`, {
          status: 1
        });
  
        if (resp.status == 200) {
          await queryClient.refetchQueries({
            queryKey: ["invoicesall"],
            type: "active",
          });
          enqueueSnackbar("เปลี่ยนสถานะเป็นชำระเงินสำเร็จ!", {
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
    },
  });

  const denypaymentConfirm = useConfirm<HTMLElement>({
    title: "แจ้งเตือน",
    text: "คุณต้องการยกเลิกสถานะการชำระเงินหรือไม่?",
    onConfirm: async (id: string) => {
      try {
        setBackdrop(true);
        const resp = await axios.patch(`/invoice/${id}`, {
          status: 0
        });
  
        if (resp.status == 200) {
          await queryClient.refetchQueries({
            queryKey: ["invoicesall"],
            type: "active",
          });
          enqueueSnackbar("ยกเลิกสถานะชำระเงินสำเร็จ!", {
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
    },
  });

  const actions = {
    edit: React.useCallback((data: Invoice) => () => { setInvoice(data); editDialog.handleOpen(); }, [setInvoice, editDialog]),
    cancel: React.useCallback((data: Invoice) => () => { cancelConfirm.with(data.id); cancelConfirm.handleOpen(); }, [cancelConfirm]),
    payment: React.useCallback((data: Invoice) => () => { paymentConfirm.with(data.id); paymentConfirm.handleOpen(); }, [paymentConfirm]),
    denypayment: React.useCallback((data: Invoice) => () => { denypaymentConfirm.with(data.id); denypaymentConfirm.handleOpen(); }, [denypaymentConfirm]),
  }

  return (
    <>
      <Datatable
        columns={columns(actions)}
        name={'invoicesall'}
        fetch={getData}
        height={700}
        getCellClassName={(params) => params.field == 'status' ? `text-color-${condition(formatter.invoice(params.row), { [-1]: "secondary", 0: "info", 1: "success", 2: "primary", 3: "warning", 4: "error" }, 'normal') as string}` : ""}
        onDoubleClick={onView}
      />

      <ViewDialog onClose={viewDialog.handleClose} onOpen={viewDialog.handleOpen} open={viewDialog.open} invoice={invoice} />
      <EditDialog onClose={editDialog.handleClose} onOpen={editDialog.handleOpen} open={editDialog.open} invoice={invoice} />
      <Confirmation {...cancelConfirm.props} />
      <Confirmation {...paymentConfirm.props} />
      <Confirmation {...denypaymentConfirm.props} />
    </>

  )
}

export default Datagrid