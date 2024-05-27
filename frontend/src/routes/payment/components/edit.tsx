import * as React from "react";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Inputs, Schema } from "../schema";
import { Payment } from "../../../types/prisma";
import { banks } from "../../../config";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useInterface } from "../../../providers/InterfaceProvider";
import axios from "../../../libs/axios";

export interface EditDialogProps {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
  payment: Payment | null;
}

function EditDialog({
  onClose,
  onOpen,
  open,
  payment,
}: EditDialogProps): React.JSX.Element | null {
  const { setBackdrop } = useInterface();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      title: payment?.title,
      name: payment?.name,
      account: payment?.account
    },
  });

  React.useEffect(() => {
    if (payment != null) {
      setValue("title", payment.title);
      setValue("name", payment.name);
      setValue("account", payment.account);
    }
  }, [payment, setValue]);

  const onSubmit = async (payload: Inputs) => {
    try {
      setBackdrop(true);
      const resp = await axios.put(`/payment/${payment?.id}`, {
        ...payload,
      });

      if (resp.status == 200) {
        onClose();
        await queryClient.refetchQueries({ queryKey: ['payments'], type: 'active' })
        enqueueSnackbar("แก้ไขวิธีการชำระเงินสำเร็จ!", {
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
  };

  const handleClose = (_: any, reason: any) => {
    if (reason !== "backdropClick") {
      onClose();
    }
  };

  if (payment == null) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        disableRestoreFocus
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle>ช่องทางการชำระเงิน</DialogTitle>
        <DialogContent>
          <Grid container sx={{ mt: 2 }} rowGap={1}>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="ธนาคาร"
                autoFocus
                error={errors["title"]?.message != undefined ? true : false}
                helperText={errors["title"]?.message}
                {...register("title")}
                fullWidth
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="เลขบัญชี"
                error={errors["account"]?.message != undefined ? true : false}
                helperText={errors["account"]?.message}
                {...register("account")}
                fullWidth
              />
            </Grid>
            <Grid lg={12} sm={12} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="ชื่อ"
                error={errors["name"]?.message != undefined ? true : false}
                helperText={errors["name"]?.message}
                {...register("name")}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ยกเลิก</Button>
          <Button type="submit"> บันทึก </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditDialog;
