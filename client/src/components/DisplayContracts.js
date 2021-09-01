import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { getAllBets, takeBet } from "../utils/contracts";

import {
  Box,
  Button,
  Card as MuiCard,
  Divider as MuiDivider,
  Grid,
  Typography as MuiTypography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { useConnectedWallet } from "@terra-money/wallet-provider";

const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Divider = styled(MuiDivider)(spacing);

export default function DisplayContracts({ title, filterEvent }) {
  const [allBets, setAllBets] = useState([]);
  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    const fetchData = async () => {
      const allBets = await getAllBets();
      setAllBets(allBets);
    };
    fetchData();
  }, []);

  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom display="inline">
        {title}
      </Typography>

      <Divider my={2} />

      <Card mb={6}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bet Creator</TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">Odds</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Match Amount</TableCell>
                <TableCell align="right">Matched?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allBets.map(
                ({ host, team, odds, amount, match_amount, matched_bet }) => {
                  return (
                    <TableRow key={`${host}_${amount.amount}`}>
                      <TableCell align="right">{host}</TableCell>
                      <TableCell component="th" scope="row">
                        <Grid container direction="column">
                          <Grid item>{team}</Grid>
                          <Grid item>{team}</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="right">{odds}</TableCell>
                      <TableCell align="right">
                        {amount.amount} {amount.denom}
                      </TableCell>
                      <TableCell align="right">
                        {match_amount.amount} {match_amount.denom}
                      </TableCell>
                      <TableCell align="right">
                        {matched_bet ? (
                          "true"
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              takeBet(
                                connectedWallet,
                                host,
                                match_amount.amount,
                                match_amount.denom
                              )
                            }
                          >
                            take bet
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </Paper>
      </Card>
    </Box>
  );
}
