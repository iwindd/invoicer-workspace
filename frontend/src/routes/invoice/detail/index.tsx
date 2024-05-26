import { Stack, Typography } from "@mui/material";
import InvoicePaper, { InvoicePaperProps } from "./components/invoice";
import { InvoicePrint } from "./components/invoice";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "../../../libs/axios";

const Index = () => {
  const invoice = useLoaderData();

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3} alignItems={"center"}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">บิล</Typography>
        </Stack>
        <>
          <InvoicePrint invoice={invoice as InvoicePaperProps} />
        </>
      </Stack>
      <Stack alignItems={"center"}>
        <InvoicePaper invoice={invoice as InvoicePaperProps} />
      </Stack>
    </Stack>
  );
};

Index.Loader = async ({params}: {params: {invoiceId: string}}) => {
  return (await axios.get(`/invoice/${params.invoiceId}`)).data
}

export default Index;
