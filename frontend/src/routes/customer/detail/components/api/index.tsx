import { ApiTwoTone } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle,Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSiteURL } from '../../../../../libs/utils';
import Highlight from 'react-highlight';
import { useDialog } from '../../../../../hooks/use-dialog';

export interface ApiDialogProps {
  onClose: () => void;
  open: boolean;
}

const ApiDialog = ({ onClose, open }: ApiDialogProps) => {
  const { id } = useParams();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle >
        Api
      </DialogTitle>
      <DialogContent >
        <Stack sx={{ mt: 2 }}>
          <Stack>
            <Typography variant='h6'>IFRAME :</Typography>
            <Highlight>
              {getSiteURL()}notice/{id}
            </Highlight>
          </Stack>
          <Stack>
            <Typography variant='h6'>API :</Typography>
            <Highlight>
              {getSiteURL()}api/notice/{id}
            </Highlight>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} >ปิด</Button>
      </DialogActions>
    </Dialog>
  )
}

const ApiController = () => {
  const apiDialog = useDialog<HTMLElement>();

  return (
    <>
      <Button
        startIcon={<ApiTwoTone />}
        variant="contained"
        onClick={apiDialog.handleOpen}
        color="info"
      >
        API
      </Button>

      <ApiDialog onClose={apiDialog.handleClose} open={apiDialog.open} />
    </>
  )
}



export default ApiController