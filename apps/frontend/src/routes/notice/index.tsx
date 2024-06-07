import React from 'react'
import { Container, Stack, Typography } from '@mui/material';
import { date2 } from '../../libs/formatter';
import { PaymentController } from './component/PaymentDialog';
import { useLoaderData } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Invoice, Payment } from '../../types/prisma';
import axios from '../../libs/axios';

const Index =  () => {
  const resp = useLoaderData() as AxiosResponse;
  const account = resp.data.account as any;
  const invoices = resp.data.data as any;
  const noreport = invoices.filter((i : any) => i.status == 0);

  return (
    <Container sx={{ pt: 25 }}>
      <Stack spacing={3} sx={{ px: 10, pt: 10 }} alignItems={'center'} >
        <Typography align='center' variant='h1' noWrap >
          {
            noreport.length > 0 ? (
              "โปรดตรวจสอบค่าบริการที่ต้องชำระ"
            ) : (
              "กำลังรอแอดมินตรวจสอบค่าบริการ"
            )
          }
        </Typography>
        {
          noreport.length > 0 ? (
            <>
              <Typography align='center' variant='h6' noWrap >
                กรุณาชำระบริการก่อนวันที่ {date2(invoices[0].end)}
              </Typography>
              <Stack width={'fit-content'} sx={{mb: 10}} >
                <PaymentController invoices={invoices as Invoice[]} payment={account as Payment}/>
              </Stack>
            </>
          ) : (null)
        }
      </Stack>
      {
        noreport.length > 0 ? (
          <Stack alignItems={'center'}>
            <Typography variant='caption' sx={{ mt: 2 }} >
              บริษัทฯ ขออภัยหากท่านได้ชำระค่าบริการดังกล่าวแล้ว
              ลองอีกครั้งในภายหลัง
            </Typography>
          </Stack>
        ) : null
      }
    </Container >
  )
}

Index.Loader = async ({params}: {params: {id: string}}) => {
  return axios.get(`/notice/${params.id}`)
}

export default Index