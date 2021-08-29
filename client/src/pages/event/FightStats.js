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

const TableRow = styled(MuiTableRow)`
  height: 42px;
`;

const TableCell = styled(MuiTableCell)`
  padding-top: 0;
  padding-bottom: 0;
`;

const Card = styled(MuiCard)`
  height: 100%;
`;

function FightStats({ team1, team2, stats }) {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Statistics</TableCell>
              <TableCell align="center">{team1}</TableCell>
              <TableCell align="center">{team2}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.title.map((stat, index) => (
              <TableRow key={`${stat.team1}-${index}`}>
                <TableCell component="th" scope="row">
                  {stat}
                </TableCell>
                <TableCell align="center">{stats.team1[index]}</TableCell>
                <TableCell align="center">{stats.team2[index]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default FightStats;
