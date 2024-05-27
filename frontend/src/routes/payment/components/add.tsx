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
import { useInterface } from "../../../providers/InterfaceProvider";
import { useSnackbar } from "notistack";
import axios from "../../../libs/axios";

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
  const { setBackdrop } = useInterface();
  const { enqueueSnackbar } = useSnackbar();

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
    console.log(payload);
    
    try {
      setBackdrop(true);
      const resp = await axios.post("/payment", {
        ...payload,
        active: checked,
      });

      if (resp.status == 200) {
        onClose();
        enqueueSnackbar("เพิ่มวิธีการชำระเงินสำเร็จ!", {
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
