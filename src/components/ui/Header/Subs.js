import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "../../../Link";
import { useTheme } from "@mui/material";
export default function Subs({ option, tabsStyle, service }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Link
        id={`${option.link}-tab`}
        aria-controls={openMenu ? `${option.link}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        // component={Link}
        onMouseEnter={(e) => handleMenuOpen(e)}
        onClick={(e) => handleMenuOpen(e)}
        href={option.link}
        sx={tabsStyle}
        className={
          option.subs.filter((sub) => sub.link === service)[0]
            ? "Mui-selected"
            : undefined
        }
      >
        {option.name}
      </Link>
      <Menu
        id={`${option.link}-menu`}
        open={openMenu}
        onClose={handleMenuClose}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": `${option.link}-tab`,
          onMouseLeave: handleMenuClose,
        }}
        sx={(theme) => {
          return {
            "& 	.MuiMenu-paper": {
              backgroundColor: theme.palette.common.blue,
            },
          };
        }}
        elevation={0}
      >
        {option.subs.map((option, index) => (
          <MenuItem
            component={Link}
            href={option.link}
            key={index}
            onClick={() => {
              //   setValue(option.index);
              //   setService(option.link);
              handleMenuClose();
            }}
            sx={{
              ...theme.typography.tab,
              "&:hover": {
                opacity: 1,
                backgroundColor: theme.palette.primary.light,
              },
            }}
            style={
              option.link === service
                ? {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.light,
                  }
                : undefined
            }
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
