import React from "react";
import { NavigateNextTwoTone } from "@mui/icons-material";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { paths, routes } from "../../config";
import { Link as RouterLink } from "react-router-dom"; 

const findRoute = (pathSegments: string[]) => {
  return routes.find((route) => {
    const routeSegments = route.path.split("/").filter((segment) => segment);
    if (routeSegments.length !== pathSegments.length) return false;
    return routeSegments.every((segment, index) => {
      return segment.startsWith(":") || segment === pathSegments[index];
    });
  });
};

const Breadcrumb = () => {
  const { pathname } = useLocation();
  const pathNames = pathname.split("/").filter((path) => path);

  return (
    <Breadcrumbs separator={<NavigateNextTwoTone fontSize="small" />}>
      <Link underline="hover" color="inherit" component={RouterLink} to={`${paths.home}`}>
        {" "}
        Invoicer{" "}
      </Link>

      {pathNames.map((_, index) => {
        const pathSegments = pathNames.slice(0, index + 1);
        const path = `/${pathSegments.join("/")}`;
        const route = findRoute(pathSegments);

        if (path == "/admin") return null;
        if (!route) return null;

        const isActive = pathNames.length === pathSegments.length;

        return !isActive ? (
          <Link underline="hover" color="inherit" href={path} key={route.path}>
            {route.label}
          </Link>
        ) : (
          <Typography color="text.primary" key={route.path}>
            {route.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
