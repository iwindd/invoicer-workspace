import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

import { LogoutTwoTone, PeopleTwoTone } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { useInterface } from "../providers/InterfaceProvider";
import { paths } from "../config";

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({
  anchorEl,
  onClose,
  open,
}: UserPopoverProps): React.JSX.Element {
  const { enqueueSnackbar } = useSnackbar();
  const { setBackdrop } = useInterface();
  const { Logout, userData } = useAuth();

  const onLogout = React.useCallback(async (): Promise<void> => {
    setBackdrop(true);
    onClose();
    try {
      await Logout();
      
      if (await Logout()){
        enqueueSnackbar("ออกจากระบบสำเร็จ!", { variant: "success" });
      }else{
        throw Error("cannot_logout");
      }
    } catch (err) {
      enqueueSnackbar("มีบางอย่างผิดพลาด กรุณาลองอีกครั้งในภายหลัง", {
        variant: "error",
      });
    } finally{
      setBackdrop(false);
    }
  }, [enqueueSnackbar, setBackdrop, onClose]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: "240px" } } }}
    >
      <Box sx={{ p: "16px 20px " }}>
        <Typography variant="subtitle1">
          {userData?.firstname} {userData?.lastname}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {userData?.email}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
      >
        {
          userData?.permission == 1 ? (
            <MenuItem
              component={Link}
              to={`${paths.admin}/${userData?.id}`}
              onClick={onClose}
            >
              <ListItemIcon>
                <PeopleTwoTone />
              </ListItemIcon>
              บัญชี
            </MenuItem>
          ): null
        }
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutTwoTone />
          </ListItemIcon>
          ออกจากระบบ
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
