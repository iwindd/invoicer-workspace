import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import { AxiosResponse } from "axios";
import { useNavigate, useRouteError } from "react-router-dom";
import { paths } from "./config";

const ErrorPage = () => {
  const error = useRouteError() as any ;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (error.response && error.response.status == 401 && navigate){
      navigate(paths.signIn)
    }
  }, [error, navigate])

  return (
    <Container>
      <Stack 
        id="error-page" 
        alignItems={"center"} 
        spacing={2}
        sx={{mt:6}}
      >
        <Typography variant="h1">Oops!</Typography>
        <Typography>Sorry, an unexpected error has occurred.</Typography>
      </Stack>
    </Container>
  );
};

export default ErrorPage;
