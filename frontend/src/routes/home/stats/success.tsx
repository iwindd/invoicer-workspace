import { CheckTwoTone } from '@mui/icons-material';
import { Avatar, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { paths } from '../../../config';

export interface TotalSuccessInvoiceProps {
  sx?: SxProps;
  value: string;
}

export function TotalSuccessInvoice({ value, sx }: TotalSuccessInvoiceProps): React.JSX.Element {
  return (
    <Link
      underline="none"
      component={RouterLink}
      to={`${paths.invoice}?fStatus=1`}
    >
      <Card sx={sx}>
        <CardContent>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                บิลที่สำเร็จ
              </Typography>
              <Typography variant="h4">{value}</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
              <CheckTwoTone />
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
}