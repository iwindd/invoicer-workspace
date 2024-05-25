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
import { Customers } from "../../../types/prisma";
import { useParams } from "react-router-dom";

const Index = () => {
  const { customerId } = useParams();
  const customer: customer = {};
  const analysis: analysis = {};

  const data = {} as Customers;

  const stats = {
    success: [].filter((i: any) => i.status == 1),
    cancel: [].filter((i: any) => i.status == -1),
    pending: [].filter(
      (i: any) =>
        i.status == 0 && dayjs().isBetween(dayjs(i.start), dayjs(i.end))
    ),
    fail: [].filter(
      (i: any) => i.status == 0 && dayjs().isAfter(dayjs(i.end))
    ),
  };

  return (
    <Grid container spacing={3}>
      <Grid lg={12} md={12} xs={12}>
        <Stack direction="row" spacing={3} alignItems={"center"}>
          <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">
              {data?.firstname} {data?.lastname}{" "}
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
          id={Number(customerId)}
          sx={{ height: "100%" }}
          value={`${formatter.number([].length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalSuccessInvoice
          id={Number(customerId)}
          sx={{ height: "100%" }}
          value={`${formatter.number(stats.success.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProgressInvoice
          id={Number(customerId)}
          sx={{ height: "100%" }}
          value={`${formatter.number(stats.pending.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalFailInvoice
          id={Number(customerId)}
          sx={{ height: "100%" }}
          value={`${formatter.number(stats.fail.length)} รายการ`}
        />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <Datatable />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <EditProfile customer={data as Customers} />
      </Grid>
    </Grid>
  );
};

export default Index;
