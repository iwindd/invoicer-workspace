"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRightTwoTone, SearchTwoTone } from '@mui/icons-material';
import * as formatter from '../../../../libs/formatter';
import { Link as RouterLink } from 'react-router-dom';
import { Invoice, User } from '../../../../types/prisma';
import { condition } from '../../../../libs/utils';
import { paths } from '../../../../config';
import { Link } from '@mui/material';

export interface TableAdminInvoiceProps {
  data: User,
  invoices?: Invoice[];
  sx?: SxProps;
}

export function TableAdminInvoice({ invoices = [], sx, data }: TableAdminInvoiceProps): React.JSX.Element {
  const filters = invoices.slice(0, 7);

  return (
    <>
      <Card sx={sx}>
        <CardHeader title="บิลที่เพิ่ม" />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 800 }} size='small'>
            <TableHead>
              <TableRow>
                <TableCell>สถานะ</TableCell>
                <TableCell>หมายเหตุ</TableCell>
                <TableCell>วันครบกำหนด</TableCell>
                <TableCell>วันที่เพิ่ม</TableCell>
                <TableCell>เครื่องมือ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filters.map((invoice) => {
                return (
                  <TableRow hover key={invoice.id}>
                    <TableCell>
                      <Chip
                        label={formatter.invoice_(invoice)}
                        size="small"
                        color={`${condition(formatter.invoice(invoice), { [-1]: "secondary", 0: "info", 1: "success", 2: "primary", 3: "warning", 4: "error" }, 'normal') as "primary"}`}
                      /></TableCell>
                    <TableCell>{formatter.text(invoice.note)}</TableCell>
                    <TableCell>{formatter.date2(invoice.end)}</TableCell>
                    <TableCell>{formatter.date2(invoice.createdAt)}</TableCell>
                    <TableCell>
                      <Link component={RouterLink} to={`${paths.customers}/${data.user.id}/${invoice.id}`} >
                        <Button variant='text' color="inherit" startIcon={<SearchTwoTone />} > บิล </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="inherit"
            endIcon={<ArrowRightTwoTone />}
            size="small"
            variant="text"
            component={RouterLink}
            to={`${paths.invoice}?search=${data.firstname} ${data.lastname}`}
          >
            ดูทั้งหมด
          </Button>
        </CardActions>
      </Card>
    </>
  );
}