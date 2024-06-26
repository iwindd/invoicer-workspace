import { Box, Container, GlobalStyles } from "@mui/material";
import React from "react";
import { SideNav } from "./sidenav";
import { MainNav } from "./mainnav";
import Breadcrumb from "./breadcrumb";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): React.JSX.Element => {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            "--MainNav-height": "56px",
            "--MainNav-zIndex": 1000,
            "--SideNav-width": "280px",
            "--SideNav-zIndex": 1100,
            "--MobileNav-width": "320px",
            "--MobileNav-zIndex": 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: "var(--mui-palette-background-default)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          minHeight: "100%",
        }}
      >
        <SideNav />
        <Box
          sx={{
            display: "flex",
            flex: "1 1 auto",
            flexDirection: "column",
            pl: { lg: "var(--SideNav-width)" },
          }}
        >
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: 2 }}>
              <Breadcrumb />
            </Container>
            <Container maxWidth="xl" sx={{ py: "10px" }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
