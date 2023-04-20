import AnimDrawerIcon from "../AnimDrawerIcon";

import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
import { useRouter } from "next/router";
import Link from "../../../Link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Card, IconButton, Tab, useMediaQuery, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useTheme } from "@emotion/react";
import Image from "next/image";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Subs from "./Subs";
import Cart from "../../Cart/Cart";
import CartContext from "../../../store/cart-context";

const Header = ({ options, specialOption }) => {
  const ctxCart = useContext(CartContext);
  const router = useRouter();
  const service = router.asPath;
  console.log(router.pathname);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const defaultTheme = useTheme();
  const matches = useMediaQuery(defaultTheme.breakpoints.down("md"));
  //   const matchesSM = useMediaQuery(defaultTheme.breakpoints.down("sm"));

  const [activeSubsIndex, setActiveSubsIndex] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openServiceCollapse, setOpenServiceCollapse] = useState(false);

  const estimate = specialOption
    ? {
        ...specialOption,
        index: options.length,
      }
    : undefined;
  const tabsStyle = (theme) => {
    return {
      ...theme.typography.tab,
      minWidth: 7,
    };
  };
  const tabs = (
    <>
      <Grid
        container
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          marginLeft: "auto",
          "&& .Mui-selected": {
            // && are used to increase the specificity
            color: "#fff",
            opacity: 1,
          },
          a: {
            textDecoration: "none",
            paddingRight: "1em",
            peddingLeft: "1em",
            marginRight: "5px",
          },
        }}
      >
        {options.map((option, index) => {
          if (option.subs) {
            return (
              <Subs
                key={index}
                option={option}
                index={index}
                tabsStyle={tabsStyle}
                service={service}
              />
            );
          } else
            return (
              <Link
                key={index}
                href={option.link}
                sx={tabsStyle}
                className={option.link === service ? "Mui-selected" : undefined}
              >
                {option.name}
              </Link>
            );
        })}
        {estimate && (
          <Button
            // variant="contained"
            color="secondary"
            component={Link}
            href={estimate.link}
            sx={(theme) => {
              return {
                ...theme.typography.estimate,
                backgroundColor: theme.palette.secondary.main,
                "&:hover": { backgroundColor: theme.palette.secondary.light },
                borderRadius: "50px",
                marginLeft: "10px",
                marginRight: "15px",
                color: "white",
              };
            }}
          >
            {estimate.name}
          </Button>
        )}
      </Grid>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        // BackdropProps={{ invisible: !matches }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        sx={(theme) => {
          return {
            zIndex: defaultTheme.zIndex.appBar - 1,
            "& .MuiPaper-root": { backgroundColor: theme.palette.common.blue },
          };
        }}
      >
        <Box
          sx={(theme) => ({
            ...defaultTheme.mixins.toolbar,
            [defaultTheme.breakpoints.up("md")]: { marginBottom: "2em" },
            [defaultTheme.breakpoints.down("md")]: { marginBottom: "1.5em" },
            [defaultTheme.breakpoints.down("sm")]: {
              marginBottom: "1em",
              width: "80vw",
            },
          })}
        />
        <List
          disablePadding
          sx={(theme) => {
            return {
              " &&& .MuiListItem-root, && .MuiButtonBase-root, & .MuiTypography-root":
                {
                  ...theme.typography.tab,
                  color: "white",
                },
              "&& .Mui-selected , && .MuiListItem-root:hover,&& .MuiButtonBase-root:hover, && MuiTypography-root":
                {
                  backgroundColor: theme.palette.primary.light,
                  opacity: 1,
                },
            };
          }}
        >
          {options.map((option, optionIndex) => {
            if (option.subs) {
              return (
                <Box key={optionIndex}>
                  <ListItemButton
                    divider
                    onClick={() => {
                      setActiveSubsIndex((prev) => {
                        if (prev === optionIndex) return null;
                        return optionIndex;
                      });
                      setOpenServiceCollapse(!openServiceCollapse);
                    }}
                    className={
                      option.subs.filter((sub) => sub.link === service)[0]
                        ? "Mui-selected"
                        : undefined
                    }
                  >
                    <ListItemText primary={option.name} />
                    {optionIndex === activeSubsIndex ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )}
                  </ListItemButton>
                  <Collapse
                    in={optionIndex === activeSubsIndex}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {option.subs.map((sub, index) => {
                        return (
                          <ListItemButton
                            divider
                            component={Link}
                            href={sub.link}
                            key={index}
                            onClick={() => {
                              setOpenServiceCollapse(!openServiceCollapse);
                              setOpenDrawer(false);
                            }}
                            className={
                              sub.link === service ? "Mui-selected" : null
                            }
                            sx={(theme) => theme.typography.tab}
                          >
                            <ListItemText primary={sub.name} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </Box>
              );
            } else
              return (
                <ListItem
                  key={optionIndex}
                  onClick={() => {
                    setOpenDrawer(false);
                    setOpenServiceCollapse(false);
                  }}
                  divider
                  button
                  component={Link}
                  href={option.link}
                  // className={value === optionIndex ? " Mui-selected" : null}
                >
                  <ListItemText disableTypography>{option.name}</ListItemText>
                </ListItem>
              );
          })}
          {estimate && (
            <ListItem
              onClick={() => {
                setOpenDrawer(false);
                setOpenServiceCollapse(false);
              }}
              divider
              button
              component={Link}
              href={estimate.link}
              className={estimate.link === service ? "Mui-selected" : undefined}
              sx={(theme) => {
                return {
                  backgroundColor: theme.palette.secondary.main,
                  "&&&:hover": {
                    backgroundColor: theme.palette.secondary.main,
                    opacity: 1,
                  },
                  "&&&.Mui-selected": {
                    backgroundColor: theme.palette.secondary.main,
                    opacity: 1,
                  },
                };
              }}
            >
              <ListItemText disableTypography>{estimate.name}</ListItemText>
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
      <IconButton
        sx={{
          // marginLeft: "auto",
          marginRight: "15px",
          height: "50px",
          width: "50px",
        }}
        onClick={() => setOpenDrawer((prev) => !prev)}
        disableRipple
      >
        {/* {openDrawer ? (
          <CloseIcon sx={{ height: "50px", width: "50px" }} />
        ) : (
          <MenuIcon sx={{ height: "50px", width: "50px" }} />
        )} */}
        <AnimDrawerIcon open={openDrawer} />
      </IconButton>
    </>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar disableGutters sx={{ justifyContent: "end" }}>
          <Button
            component={Link}
            href="/"
            sx={{ padding: 0, marginRight: "auto" }}
            disableRipple
          >
            <Box
              component="img"
              alt="company logo"
              src="/assets/logo.png"
              sx={{
                [defaultTheme.breakpoints.down("md")]: {
                  height: "5em",
                },
                [defaultTheme.breakpoints.up("md")]: {
                  height: "5.5em",
                  pading: "1em",
                },
                [defaultTheme.breakpoints.up("lg")]: {
                  height: "6.5em",
                },
              }}
            />
          </Button>

          <Hidden mdDown> {tabs}</Hidden>
          <IconButton
            color="secondary"
            onClick={ctxCart.showCart.function}
            sx={{ position: "relative" }}
          >
            <Badge badgeContent={ctxCart.cartSize} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>
          <Cart />
          {drawer}
        </Toolbar>
      </AppBar>
      <Box
        sx={(theme) => ({
          ...defaultTheme.mixins.toolbar,
          [defaultTheme.breakpoints.up("md")]: { marginBottom: "2em" },
          [defaultTheme.breakpoints.down("md")]: { marginBottom: "1.5em" },
          [defaultTheme.breakpoints.down("sm")]: { marginBottom: "1em" },
        })}
      />
    </>
  );
};

export default Header;
