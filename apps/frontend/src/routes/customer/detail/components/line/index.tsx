import { EditTwoTone, SyncTwoTone } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import { Customers } from "../../../../../types/prisma";
import { useDialog } from "../../../../../hooks/use-dialog";
import { useInterface } from "../../../../../providers/InterfaceProvider";
import { useSnackbar } from "notistack";
import axios from "../../../../../libs/axios";

export interface LineDialogProps {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
  customer: Customers;
}

const LineDialog = ({ onClose, onOpen, open, customer }: LineDialogProps) => {
  const [token, setToken] = React.useState<string>(customer.lineToken);
  const { setBackdrop } = useInterface();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = (_: any, reason: any) => {
    if (reason !== "backdropClick") {
      onClose();
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      setBackdrop(true);
      const resp = await axios.patch(`/customers/${customer.id}`, {
        lineToken: token
      });

      if (resp.status == 200) {
        onClose();
        enqueueSnackbar("เชื่อมต่อไลน์สำเร็จ!", {
          variant: "success",
        });
      } else {
        throw Error(resp.statusText);
      }
    } catch (error) {
      enqueueSnackbar("มีบางอย่างผิดพลาดกรุณาลองใหม่อีกครั้งภายหลัง!", {
        variant: "error",
      });
    } finally {
      setBackdrop(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: onSubmit,
      }}
    >
      <DialogTitle>Line Notification</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ใส่ Line Token เพื่อแจ้งเตือนไลน์ของลูกค้าเกี่ยวกับรายละเอียดของบิล
          เช่นวันใกล้ครบกำหนดเป็นต้น
        </DialogContentText>
        <TextField
          margin="dense"
          label="Line Token"
          type="text"
          fullWidth
          value={token}
          onChange={(e) => setToken(e.target.value)}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ปิด</Button>
        <Button type="submit">ยืนยัน</Button>
      </DialogActions>
    </Dialog>
  );
};

const LineController = ({ customer }: { customer: Customers }) => {
  const lineDialog = useDialog<HTMLElement>();

  return (
    <>
      <Button
        startIcon={customer.lineToken == "" ? <SyncTwoTone /> : <EditTwoTone />}
        variant="text"
        color="inherit"
        onClick={lineDialog.handleOpen}
      >
        LINE
      </Button>

      <LineDialog
        onClose={lineDialog.handleClose}
        onOpen={lineDialog.handleOpen}
        open={lineDialog.open}
        customer={customer}
      />
    </>
  );
};

export default LineController;
