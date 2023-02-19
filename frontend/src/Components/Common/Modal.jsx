import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ModelDialog({
  handleClose,
  open,
  headline,
  tableData
}) {
  console.log("tableData", tableData)
  return (
    <React.Fragment>
      <Dialog
        // fullWidth={fullWidth}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Extended Data of Compute</DialogTitle>
        <DialogContent>
          <DialogContentText>{headline}</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <TableContainer>
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>App Name</TableCell>
                    <TableCell align="right">Environment</TableCell>
                    <TableCell align="right">Business Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    key={1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {tableData['app-name']}
                    </TableCell>
                    <TableCell align="right">{tableData.environment}</TableCell>
                    <TableCell align="right">
                      {tableData['business-unit']}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
