import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Datatable from "./components/datatable";
import { Stack, Typography } from "@mui/material";
import AddController from "./components/add";
import * as formatter from "../../../libs/formatter";
import dayjs from "../../../libs/dayjs";
import EditProfile from "./components/editprofile";
import ApiController from "./components/api";
import { TotalInvoice } from "./components/stats/total";
import { TotalSuccessInvoice } from "./components/stats/success";
import { TotalProgressInvoice } from "./components/stats/progress";
import { TotalFailInvoice } from "./components/stats/fail";
import { analysis, customer } from "./type";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "../../../libs/axios";
import { AxiosResponse } from "axios";

const Index = () => {
  const resp = useLoaderData() as AxiosResponse;
  const customer: customer = resp.data.customer;
  const analysis: analysis = resp.data.invoices;

  const stats = {
    success: analysis.filter((i: any) => i.status == 1),
    cancel: analysis.filter((i: any) => i.status == -1),
    pending: analysis.filter(
      (i: any) =>
        i.status == 0 && dayjs().isBetween(dayjs(i.start), dayjs(i.end))
    ),
    fail: analysis.filter(
      (i: any) => i.status == 0 && dayjs().isAfter(dayjs(i.end))
    ),
  };

  return (
    <Grid container spacing={3}>
      <Grid lg={12} md={12} xs={12}>
        <Stack direction="row" spacing={3} alignItems={"center"}>
          <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">
              {customer?.firstname} {customer?.lastname}{" "}
            </Typography>
          </Stack>
          <>
            <ApiController />
            <AddController />
          </>
        </Stack>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalInvoice
          id={Number(customer.id)}
          sx={{ height: "100%" }}
          value={`${formatter.number([].length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalSuccessInvoice
          id={Number(customer.id)}
          sx={{ height: "100%" }}
          value={`${formatter.number(stats.success.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProgressInvoice
          id={Number(customer.id)}
          sx={{ height: "100%" }}
          value={`${formatter.number(stats.pending.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalFailInvoice
          id={Number(customer.id)}
          sx={{ height: "100%" }}
          value={`${formatter.number(stats.fail.length)} รายการ`}
        />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <Datatable />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <EditProfile customer={customer} />
      </Grid>
    </Grid>
  );
};

Index.Loader = ({ params }: { params: { customerId: string } }) => {
  return axios.get(`/customers/${params.customerId}`);
};

export default Index;
