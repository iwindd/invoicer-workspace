import { LoginTwoTone } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inputs, Schema } from "./schema";
import { useAuth } from "../../providers/AuthProvider";
import { useInterface } from "../../providers/InterfaceProvider";
import { useSnackbar } from "notistack";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { paths } from "../../config";

const Index = () => {
  const { SignIn, userData } = useAuth();
  const { setBackdrop } = useInterface();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(Schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (payload: Inputs) => {
    try {
      setBackdrop(true);
      const resp = await SignIn(payload.email, payload.password);

      if (resp) {
        enqueueSnackbar("เข้าสู่ระบบสำเร็จ!", { variant: "success" });
        navigate(paths.home);
      } else {
        enqueueSnackbar("ไม่พบผู้ใช้", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar("มีบางอย่างผิดพลาด กรุณาลองอีกครั้งในภายหลัง", {
        variant: "error",
      });
    } finally {
      if (!userData) {
        setBackdrop(false);
      }
    }
  };

  if (userData) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ mt: 6 }}>
        <Paper component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4">เข้าสู่ระบบ</Typography>
              <Divider sx={{ mt: 2 }} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="อีเมล"
                error={errors["email"]?.message != undefined ? true : false}
                helperText={errors["email"]?.message}
                {...register("email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="รหัสผ่าน"
                error={errors["password"]?.message != undefined ? true : false}
                helperText={errors["password"]?.message}
                {...register("password")}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<LoginTwoTone />}
              >
                เข้าสู่ระบบ
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Index;
