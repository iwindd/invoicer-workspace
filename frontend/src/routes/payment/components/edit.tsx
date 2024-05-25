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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      bank: payment?.bankId,
      account: payment?.account,
      idcard: payment?.idcard,
      phone: payment?.phone,
      firstname_thai: payment?.firstname_thai,
      firstname_eng: payment?.firstname_eng,
      lastname_thai: payment?.firstname_thai,
      lastname_eng: payment?.lastname_eng
    },
  });

  React.useEffect(() => {
    if (payment != null) {
      setValue("bank", payment.bankId);
      setValue("firstname_thai", payment.firstname_thai);
      setValue("firstname_eng", payment.firstname_eng);
      setValue("lastname_thai", payment.lastname_thai);
      setValue("lastname_eng", payment.lastname_eng);
      setValue("account", payment.account);
      setValue("phone", payment.phone);
      setValue("idcard", payment.idcard);
    }
  }, [payment, setValue]);

  const onSubmit = async (payload: Inputs) => {
 
  };

  const handleClose = (_: any, reason: any) => {
    if (reason !== "backdropClick") {
      onClose();
    }
  };

  const bankOptions = banks.map((b) => ({
    value: b.id,
    label: b.thai_name,
  }))

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
              <Autocomplete
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                options={bankOptions}
                defaultValue={bankOptions.find(b => b.value == payment.bankId)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={errors["bank"]?.message != undefined ? true : false}
                    helperText={errors["bank"]?.message}
                  />
                )}
                {...register("bank")}
                onChange={(event, value) => {
                  setValue("bank", value?.value || ""); // Assuming you have setValue from React Hook Form
                }}
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="หมายเลขบัญชี"
                error={errors["account"]?.message != undefined ? true : false}
                helperText={errors["account"]?.message}
                {...register("account")}
                fullWidth
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="หมายเลขบัตรประชาชนที่ลงทะเบียน"
                error={errors["idcard"]?.message != undefined ? true : false}
                helperText={errors["idcard"]?.message}
                {...register("idcard")}
                fullWidth
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="เบอร์มือถือที่ลงทะเบียน"
                error={errors["phone"]?.message != undefined ? true : false}
                helperText={errors["phone"]?.message}
                {...register("phone")}
                fullWidth
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="ชื่อจริง (ไทย)"
                error={
                  errors["firstname_thai"]?.message != undefined ? true : false
                }
                helperText={errors["firstname_thai"]?.message}
                {...register("firstname_thai")}
                fullWidth
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="นามสกุล (ไทย)"
                error={
                  errors["lastname_thai"]?.message != undefined ? true : false
                }
                helperText={errors["lastname_thai"]?.message}
                {...register("lastname_thai")}
                fullWidth
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="ชื่อจริง (ภาษาอังกฤษ)"
                error={
                  errors["firstname_eng"]?.message != undefined ? true : false
                }
                helperText={errors["firstname_eng"]?.message}
                {...register("firstname_eng")}
                fullWidth
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="นามสกุล (ภาษาอังกฤษ)"
                error={
                  errors["lastname_eng"]?.message != undefined ? true : false
                }
                helperText={errors["lastname_eng"]?.message}
                {...register("lastname_eng")}
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
