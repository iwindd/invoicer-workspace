import { Stack, Typography } from "@mui/material";
import InvoicePaper, { InvoicePaperProps } from "./components/invoice";
import { InvoicePrint } from "./components/invoice";
import { useParams } from "react-router-dom";

const Index = () => {
  const { invoiceId } = useParams();
  const invoice = {};

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

export default Index;
