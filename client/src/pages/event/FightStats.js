import React from "react";
import styled from "styled-components/macro";

import {
  Card as MuiCard,
  CardContent,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow as MuiTableRow,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

function FightStats() {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Statistics</TableCell>
              <TableCell align="right">Lewis</TableCell>
              <TableCell align="right">Gane</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Win/Loss/Draw
              </TableCell>
              <TableCell align="right">25-8-0</TableCell>
              <TableCell align="right">9-0-0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Fight Win Streak
              </TableCell>
              <TableCell align="right">4</TableCell>
              <TableCell align="right">9</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Wins By Knockout
              </TableCell>
              <TableCell align="right">20</TableCell>
              <TableCell align="right">3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Wins By Submission
              </TableCell>
              <TableCell align="right">1</TableCell>
              <TableCell align="right">3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Striking Accuracy
              </TableCell>
              <TableCell align="right">50%</TableCell>
              <TableCell align="right">55%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Grappling Accuracy
              </TableCell>
              <TableCell align="right">27%</TableCell>
              <TableCell align="right">22%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default FightStats;
