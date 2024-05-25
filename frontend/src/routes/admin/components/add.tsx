import * as React from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Inputs, Schema } from '../schema';
import { useForm } from 'react-hook-form';
import { AddTwoTone } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { useDialog } from '../../../hooks/use-dialog';

export interface AddDialogProps {
  onClose: () => void;
  open: boolean;
}

function AddDialog({ onClose, open }: AddDialogProps): React.JSX.Element {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>({
    resolver: zodResolver(Schema)
  });

  const onSubmit = async (payload: Inputs) => {

  }

  const handleClose = (_: any, reason: any) => {
    if (reason !== 'backdropClick') {
      onClose()
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        disableRestoreFocus
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit(onSubmit),
        }}
      >
        <DialogTitle >
          เพิ่มแอดมิน
        </DialogTitle>
        <DialogContent >
          <Grid container sx={{ mt: 2 }} rowGap={1}>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="ชื่อ"
                autoFocus
                error={errors['firstname']?.message != undefined ? true : false}
                helperText={errors['firstname']?.message}
                {...register("firstname")}
                disabled={isLoading}
                fullWidth
              />
            </Grid>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                type="text"
                label="นามสกุล"
                error={errors['lastname']?.message != undefined ? true : false}
                helperText={errors['lastname']?.message}
                {...register("lastname")}
                disabled={isLoading}
                fullWidth
              />
            </Grid>
            <Grid lg={12} sm={12} sx={{ px: 0.5 }}>
              <TextField
                type="email"
                label="อีเมล"
                error={errors['email']?.message != undefined ? true : false}
                helperText={errors['email']?.message}
                {...register("email")}
                disabled={isLoading}
                fullWidth
              />
            </Grid>
            <Grid lg={12} sm={12} sx={{ px: 0.5 }}>
              <TextField
                type="password"
                label="รหัสผ่าน"
                error={errors['password']?.message != undefined ? true : false}
                helperText={errors['password']?.message}
                {...register("password")}
                disabled={isLoading}
                fullWidth
              />
            </Grid>
            <Grid lg={12} sm={12} sx={{ px: 0.5 }}>
              <TextField
                type="password"
                label="ยืนยันรหัสผ่าน"
                error={errors['confirmPassword']?.message != undefined ? true : false}
                helperText={errors['confirmPassword']?.message}
                {...register("confirmPassword")}
                disabled={isLoading}
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
                  label="ผู้ดูแลระบบ"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isLoading}>ยกเลิก</Button>
          <Button type='submit' disabled={isLoading}> เพิ่มรายการใหม่ </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const AddController = () => {
  const addDialog = useDialog<HTMLDivElement>();

  return (
    <>
      <Button startIcon={<AddTwoTone />} variant="contained" onClick={addDialog.handleOpen}>
        เพิ่มรายการ
      </Button>

      <AddDialog onClose={addDialog.handleClose} open={addDialog.open} />
    </>
  )
}

export default AddController