import React from "react";
import styled, { withTheme } from "styled-components/macro";

import {
  Box,
  Grid,
  Hidden,
  AppBar as MuiAppBar,
  IconButton as MuiIconButton,
  Toolbar,
  Tooltip,
  Zoom,
  Chip as MuiChip,
} from "@material-ui/core";

import { HelpCircle } from "react-feather";
import { Menu as MenuIcon } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import LanguagesDropdown from "./LanguagesDropdown";
import Wallet from "./Wallet";

const Chip = styled(MuiChip)`
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const AppBar = styled(MuiAppBar)`
  background: ${(props) => props.theme.header.background};
  color: ${(props) => props.theme.header.color};
`;

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

const AppBarComponent = ({ onDrawerToggle }) => {
  const { network, status } = useWallet();

  return (
    <React.Fragment>
      <AppBar position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Hidden mdUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={onDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item>
              <Tooltip
                TransitionComponent={Zoom}
                title="New to sports betting?"
                placement="right"
              >
                <IconButton>
                  <HelpCircle />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item xs />
            <Grid item>
              <LanguagesDropdown />
            </Grid>
            {network.name === "testnet" &&
              status === WalletStatus.WALLET_CONNECTED && (
                <Grid item>
                  <Chip rgbcolor={red[700]} label="testnet" />
                </Grid>
              )}
            <Grid item>
              <Box mx="12px">
                <Wallet />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default withTheme(AppBarComponent);
