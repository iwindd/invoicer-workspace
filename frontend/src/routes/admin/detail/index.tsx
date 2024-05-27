import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Stack, Typography } from "@mui/material";
import EditProfile from "./components/editprofile";
import { TableAdminInvoice } from "./table/TableInvoice";
import { TableAdminCustomers } from "./table/TableCustomers";
import { useLoaderData, useParams } from "react-router-dom";
import { Customers, Invoice } from "../../../types/prisma";
import axios from "../../../libs/axios";
import { AxiosResponse } from "axios";

const Index = () => {
  const resp = useLoaderData() as AxiosResponse;
  const data = {
    user: {
      id: resp?.data.id,
      firstname: resp?.data.firstname,
      lastname: resp?.data.lastname,
      email: resp?.data.email,
      permission: resp?.data.permission,
    },
    Customers: resp?.data.Customers,
    Invoice: resp?.data.Invoice,
  };

  return (
    <Grid container spacing={3}>
      <Grid lg={12} md={12} xs={12}>
        <Stack direction="row" spacing={3} alignItems={"center"}>
          <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
            <Typography variant="h4">
              {data.user.firstname} {data.user.lastname}{" "}
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
        <EditProfile user={data.user as any} />
      </Grid>
    </Grid>
  );
};  

Index.Loader = async ({params} : {params: {adminId: string}}) => {
  return await axios.get(`/users/${params.adminId}`)
}

export default Index;
