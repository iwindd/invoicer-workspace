import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { Inputs, Schema } from '../schema';
import { useForm } from 'react-hook-form';
import { AddTwoTone } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from '../../../libs/dayjs';
import { useDialog } from '../../../hooks/use-dialog';

export interface AddDialogProps {
  onClose: () => void;
  open: boolean;
}

function AddDialog({ onClose, open }: AddDialogProps): React.JSX.Element {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [joined, setJoined] = React.useState<Dayjs | null>(dayjs());

  const {
    register,
    handleSubmit,
    formState: { errors }
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
          เพิ่มลูกค้าใหม่
        </DialogTitle>
        <DialogContent >
          <Grid container sx={{ mt: 2 }} rowGap={1}>
            <Grid lg={6} sm={6} sx={{ px: 0.5 }}>
              <TextField
                autoFocus
                label="ชื่อจริง"
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
              <DatePicker
                label="วันที่เข้าร่วม"
                disabled={isLoading}
                value={joined}
                onChange={(newValue) => setJoined(newValue)}
                sx={{ width: '100%' }}
              />
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