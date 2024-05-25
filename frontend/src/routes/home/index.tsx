import Grid from "@mui/material/Unstable_Grid2/Grid2";
import dayjs from "../../libs/dayjs";
import * as ff from "../../libs/formatter";

//stats
import { TotalInvoice } from "./stats/total";
import { TotalSuccessInvoice } from "./stats/success";
import { TotalProgressInvoice } from "./stats/progress";
import { TotalFailInvoice } from "./stats/fail";
import { TotalCanceledInvoice } from "./stats/canceled";
import { TotalPendingInvoice } from "./stats/pending";
import { TotalCheckingInvoice } from "./stats/checking";
import { TotalNearInvoice } from "./stats/near";

//charts
import { Invoice } from "../../types/prisma";
import { Sales } from "./charts/sales";
import { Traffic } from "./charts/traffic";

//tables
import { OvertimeInvoice } from "./table/overtime";
import { CheckingInvoice } from "./table/checking";

function Index() {
  const invoices: Invoice[] = [];

  const stats = {
    near: invoices.filter(
      (i) =>
        i.status != 2 &&
        i.status != -1 &&
        i.status != 1 &&
        dayjs().isAfter(dayjs(i.end).subtract(7, "day")) &&
        dayjs().isBefore(dayjs(i.end))
    ),
    checking: invoices.filter((i) => i.status == 2),
    overtime: invoices.filter(
      (i) => i.status == 0 && dayjs().isAfter(dayjs(i.end))
    ),
    progress: invoices.filter(
      (i) => i.status == 0 && dayjs().isBetween(dayjs(i.start), dayjs(i.end))
    ),
    pending: invoices.filter(
      (i) => i.status == 0 && dayjs().isBefore(dayjs(i.start))
    ),
    success: invoices.filter((i) => i.status == 1),
    canceled: invoices.filter((i) => i.status == -1),
    total: invoices,
  };

  const trafficTotal =
    stats.canceled.length +
    stats.pending.length +
    stats.progress.length +
    stats.checking.length;
  const traffic = {
    total: Number(((trafficTotal / stats.total.length) * 100).toFixed(0)),
    success: Number(
      ((stats.success.length / stats.total.length) * 100).toFixed(0)
    ),
    overtime: Number(
      ((stats.overtime.length / stats.total.length) * 100).toFixed(0)
    ),
  };

  const monthsData = Array.from({ length: 12 }, (_, i) => i + 1);
  const thisYear = invoices.filter((i) =>
    dayjs(i.createdAt).isBetween(dayjs().startOf("year"), dayjs().endOf("year"))
  );
  const lastYear = invoices.filter((i) =>
    dayjs(i.createdAt).isBetween(
      dayjs().subtract(1, "year").startOf("year"),
      dayjs().subtract(1, "year").endOf("year")
    )
  );
  const invoiceCountThisYearByMonth = monthsData.map((month) => {
    const monthStart = dayjs()
      .month(month - 1)
      .startOf("month");
    const monthEnd = dayjs()
      .month(month - 1)
      .endOf("month");
    const invoicesInMonth = thisYear.filter((invoice) => {
      return dayjs(invoice.createdAt).isBetween(
        monthStart,
        monthEnd,
        null,
        "[]"
      );
    });

    return invoicesInMonth.length;
  });

  const invoiceCountLastYearByMonth = monthsData.map((month) => {
    const monthStart = dayjs()
      .subtract(1, "year")
      .month(month - 1)
      .startOf("month");
    const monthEnd = dayjs()
      .subtract(1, "year")
      .month(month - 1)
      .endOf("month");
    const InvoicesInMonth = lastYear.filter((invoice) => {
      return dayjs(invoice.createdAt).isBetween(
        monthStart,
        monthEnd,
        null,
        "[]"
      );
    });
    return InvoicesInMonth.length;
  });

  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalNearInvoice
          sx={{ height: "100%" }}
          value={`${ff.number(stats.near.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCheckingInvoice
          sx={{ height: "100%" }}
          value={`${ff.number(stats.checking.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalProgressInvoice
          sx={{ height: "100%" }}
          value={`${ff.number(stats.progress.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalFailInvoice
          sx={{ height: "100%" }}
          value={`${ff.number(stats.overtime.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalPendingInvoice
          sx={{ height: "100%" }}
          value={`${ff.number(stats.pending.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalSuccessInvoice
          sx={{ height: "100%" }}
          value={`${ff.number(stats.success.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCanceledInvoice
          sx={{ height: "100%" }}
          value={`${ff.number(stats.canceled.length)} รายการ`}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalInvoice
          sx={{ height: "100%" }}
          value={`${ff.number(stats.total.length)} รายการ`}
        />
      </Grid>
      <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            { name: "ปีนี้", data: invoiceCountThisYearByMonth },
            { name: "ปีที่แล้ว", data: invoiceCountLastYearByMonth },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <Traffic
          chartSeries={[traffic.total, traffic.success, traffic.overtime]}
          labels={["ทั้งหมด", "สำเร็จ", "เลยกำหนด"]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <OvertimeInvoice invoices={stats.overtime} sx={{ height: "100%" }} />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <CheckingInvoice invoices={stats.checking} sx={{ height: "100%" }} />
      </Grid>
    </Grid>
  );
}

export default Index;
