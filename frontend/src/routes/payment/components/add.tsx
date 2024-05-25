import * as React from "react";
import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddTwoTone } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Inputs, Schema } from "../schema";
import { banks } from "../../../config";
import { useDialog } from "../../../hooks/use-dialog";

export interface AddDialogProps {
  onClose: () => void;
  onOpen: () => void;
  open: boolean;
}

function AddDialog({
  onClose,
  onOpen,
  open,
}: AddDialogProps): React.JSX.Element {
  const [checked, setChecked] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (payload: Inputs) => {
    onClose();

  };

  const handleClose = (_: any, reason: any) => {
    if (reason !== "backdropClick") {
      onClose();
    }
  };

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
        <DialogTitle>เพิ่มช่องทางการชำระเงิน</DialogTitle>
        <DialogContent>
          <Grid container sx={{ mt: 2 }} rowGap={1}>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <Autocomplete
                isOptionEqualToValue={(option, value) => option.value === value.value}
                options={banks.map((b) => ({
                  value: b.id,
                  label: b.thai_name,
                }))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="ธนาคาร"
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
            <Grid lg={12} sm={12} sx={{ px: 0.5 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  }
                  defaultChecked
                  label="ใช้งานทันที"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>ยกเลิก</Button>
          <Button type="submit"> เพิ่มรายการใหม่ </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const AddController = () => {
  const addDialog = useDialog<HTMLDivElement>();

  return (
    <>
      <Button
        startIcon={<AddTwoTone />}
        variant="contained"
        onClick={addDialog.handleOpen}
      >
        เพิ่มรายการ
      </Button>

      <AddDialog
        onClose={addDialog.handleClose}
        onOpen={addDialog.handleOpen}
        open={addDialog.open}
      />
    </>
  );
};

export default AddController;
