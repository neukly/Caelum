import React from "react";
import styled from "styled-components/macro";

import {
  Box,
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

const Card = styled(MuiCard)(spacing);
const Typography = styled(MuiTypography)(spacing);
const Divider = styled(MuiDivider)(spacing);

export default function YourContracts({ filterEvent }) {
  // Data
  let id = 0;
  function createData(event, team1, team2, odds, payout, expiration) {
    id += 1;
    return { id, event, team1, team2, odds, payout, expiration };
  }

  const rows = [
    createData("NFL Pre-Season 2021", "Broncos", "Seahawks", 356, 16.0, 49),
    createData("Starcraft II WCS 2021", "Player 1", "Player 2", 159, 6.0, 24),
    createData("UFC 265", "Derrich Lewis", "Ciryl Gane", 237, 9.0, 37),
    createData("UFC 265", "Jose Aldo", "Pedro Munhoz", 237, 9.0, 37),
    createData(
      "League of Legends Worlds 2021",
      "Team 1",
      "Team 2",
      262,
      16.0,
      24,
      6.0
    ),
  ];
  return (
    <Box my={4}>
      <Typography variant="h4" gutterBottom display="inline">
        {filterEvent ? filterEvent : "Your Contracts"}
      </Typography>

      <Divider my={2} />

      <Card mb={6}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {!filterEvent && <TableCell>Event</TableCell>}
                <TableCell>Game</TableCell>
                <TableCell align="right">Odds</TableCell>
                <TableCell align="right">Payout</TableCell>
                <TableCell align="right">Expiration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                if (!filterEvent || row.event === filterEvent) {
                  return (
                    <TableRow key={`${row.id}_${row.expiration}`}>
                      {!filterEvent && (
                        <TableCell>
                          <Typography>{row.event}</Typography>
                        </TableCell>
                      )}
                      <TableCell component="th" scope="row">
                        <Grid container direction="column">
                          <Grid item>{row.team1}</Grid>
                          <Grid item>{row.team2}</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell align="right">{row.odds}</TableCell>
                      <TableCell align="right">{row.payout}</TableCell>
                      <TableCell align="right">{row.expiration}</TableCell>
                    </TableRow>
                  );
                } else {
                  return <></>;
                }
              })}
            </TableBody>
          </Table>
        </Paper>
      </Card>
    </Box>
  );
}
