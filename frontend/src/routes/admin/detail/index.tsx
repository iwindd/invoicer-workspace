import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, Typography } from "@mui/material";
import EditProfile from "./components/editprofile";
import { TableAdminInvoice } from "./table/TableInvoice";
import { TableAdminCustomers } from "./table/TableCustomers";
import { useParams } from "react-router-dom";
import { Customers, Invoice } from "../../../types/prisma";

const Index = () => {
  const { adminId } = useParams();
  const data = {
    User: {
      firstname: "mock",
      lastname: "up",
      email: "email",
      permission: 0,
    },
    Customers: [],
    Invoice: [],
  };

  return (
    <Grid container spacing={3}>
      <Grid lg={12} md={12} xs={12}>
        <Stack direction="row" spacing={3} alignItems={"center"}>
          <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">
              {data.User.firstname} {data.User.lastname}{" "}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <TableAdminCustomers
          data={data as any}
          customers={data.Customers as Customers[]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <TableAdminInvoice
          data={data as any}
          invoices={data.Invoice as Invoice[]}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid lg={12} md={12} xs={12}>
        <EditProfile user={data as any} />
      </Grid>
    </Grid>
  );
};

export default Index;
