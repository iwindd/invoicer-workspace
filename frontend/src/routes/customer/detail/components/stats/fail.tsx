import { TimerTwoTone } from '@mui/icons-material';
import { Avatar, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { paths } from '../../../../../config';

export interface TotalFailInvoiceProps {
  sx?: SxProps;
  value: string;
  id: number
}

export function TotalFailInvoice({ value, sx, id }: TotalFailInvoiceProps): React.JSX.Element {

  return (
    <Link
      underline="none"
      component={RouterLink}
      to={`${paths.customers}/${id}?fStatus=4`}
    >
      <Card sx={sx}>
        <CardContent>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                บิลที่เลยกำหนด
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-error-main)', height: '56px', width: '56px' }}>
              <TimerTwoTone />
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}