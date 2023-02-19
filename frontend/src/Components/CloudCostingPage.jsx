import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Modal from "./Common/Modal";
import {
  cloudCosting,
  getApplications,
  getResources,
} from "../actions/cloudCostingAction";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";


export default function CloudCostingPage() {
  // const
  const [loading, setLoading] = React.useState(true);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalPages, settotalPages] = React.useState(0);

  const [filterBy, setfilterBy] = useState("ALL");
  const [searchQuery, setsearchQuery] = useState("");
  const [applicationsList, setapplicationsList] = useState([]);
  const [resourcesList, setresourcesList] = useState([]);
  const [extraTableInfo, setextraTableInfo] = useState({});
  const [updater, setUpdater] = useState(0);
  const [sortByCost, setsortByCost] = useState(false)
  const [sortByResourceGroup, setsortByResourceGroup] = useState(false)
  const [sortBy, setsortBy] = useState('')

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeSortByCost = () => {
    setsortByCost(!sortByCost);
    setsortByResourceGroup(false);
    setsortBy("Cost");
    setUpdater((Math.random()*1000 -1))
  };
  const handleChangesortByResourceGroup = () => {
    setsortByResourceGroup(!sortByResourceGroup);
    setsortByCost(false);
    setsortBy("ResourceGroup");
    setUpdater((Math.random()*1000 -1))
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleChangeFilterBy = (event) => {
    const value = event.target.value;
    setfilterBy(value);
    if (value == "ALL") {
      // setLoading(true);
      // fetchTableData();
      setPage(0);
      setUpdater((Math.random()*1000 -1))
    }
  };

  const handleChangeSearchQuery = (event) => {
    const value = event.target.value;
    setsearchQuery(value);
    setPage(0);
    setUpdater((Math.random()*1000 -1))
    // setLoading(true);
    // fetchTableData();
  };

  //this is called once at time of mounting the component
  useEffect(() => {
    getApplications()
      .then((result) => {
        setapplicationsList(result.data);
      })
      .catch((err) => {
        console.error("error on fetching getApplications", err);
      });

    getResources()
      .then((result) => {
        setresourcesList(result.data);
      })
      .catch((err) => {
        console.error("error on fetching getResources", err);
      });
  }, []);


  const fetchTableData = function () {
    const filterByData = filterBy === "ALL" ? "" : filterBy;
    let sortType = ''
    if(sortBy != ""){
      if(sortBy === "ResourceGroup"){
        sortType = sortByResourceGroup ? "asc" : "desc"
      }
      if(sortBy === "Cost"){
        sortType = sortByCost ? "asc" : "desc"
      }

    }

    cloudCosting(page, rowsPerPage, filterByData, searchQuery, sortBy, sortType)
      .then((res) => {
        const data = res.data;
        console.log(data);
        if (data == null || data.row.length == 0) {
          console.log("data is not coming");
          return;
        }

        setPage(data.page);
        setRowsPerPage(data.page_size);
        setRows(data.row);
        settotalPages(data.count);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchTableData();
  }, [page, rowsPerPage,updater]);

 const checkMoreHandler  = (row) =>{
  handleOpen()
  console.log("row.Tags", row);
  setextraTableInfo(row.Tags)

 }
 const columns = [
  { id: "ConsumedQuantity", label: "Consume Quantity", minWidth: 40 ,isSortBy:false, component:<></>},
  { id: "Cost", label: "Cost", minWidth: 70 , isSortBy:true ,component: <>
  {sortByCost ? <KeyboardArrowUp  onClick={handleChangeSortByCost}/> : <KeyboardArrowDown  onClick={handleChangeSortByCost}/>}
</>},
  { id: "Date", label: "Date", minWidth: 40 ,isSortBy:false, component:<></>},
  { id: "InstanceId", label: "Intance Id", minWidth: 40 ,isSortBy:false, component:<></>},
  { id: "MeterCategory", label: "Meter Category", minWidth: 40, isSortBy:false , component:<></>},
  { id: "ResourceGroup", label: "Resource Group", minWidth: 90, isSortBy:true, component: <>
  {sortByResourceGroup ? <KeyboardArrowUp onClick={handleChangesortByResourceGroup} /> : <KeyboardArrowDown onClick={handleChangesortByResourceGroup} />}
</> },
  { id: "ResourceLocation", label: "Resource Location", minWidth: 40, isSortBy:false, component:<></> },
  // { id: "appName", label: "App Name", minWidth: 90 },
  // { id: "environment", label: "Environment", minWidth: 90 },
  // { id: "businessUnit", label: "Business Unit", minWidth: 90 },
  { id: "UnitOfMeasure", label: "Unit Of Measure", minWidth: 40, isSortBy:false, component:<></>},
  { id: "Location", label: "Location", minWidth: 40, isSortBy:false , component:<></>},
  { id: "ServiceName", label: "Service Name", minWidth: 40, isSortBy:false , component:<></>}
];


  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: "90%",
          //   border: "1px solid gray",

          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          //   paddingLeft: "-15px",
          marginTop: "20px",
          marginBottom: "15px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={2} xs={2} lg={2}>
            <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterBy}
                label="Filter By"
                onChange={handleChangeFilterBy}
              >
                <MenuItem value={"ALL"}>ALL</MenuItem>
                <MenuItem value={"applications"}>Applications</MenuItem>
                <MenuItem value={"resources"}>Resources</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2} xs={2} lg={2}>
            <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">{filterBy}</InputLabel>
              <Select
                disabled={filterBy == "ALL" ? true : false}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchQuery}
                label={searchQuery}
                onChange={handleChangeSearchQuery}
              >
                {(filterBy == "applications"
                  ? applicationsList
                  : resourcesList
                ).map((item, key) => (
                  <MenuItem key={key} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={8} xs={8} lg={8}></Grid>
        </Grid>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          width: "90%",
          overflow: "hidden",
          margin: "auto",
          //   marginTop: "30px",
        }}
      >
        {" "}
        <TableContainer
          sx={{
            maxHeight: 700,
            backgroundColor: "#fff",
            boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2)",
            borderRadius: "5px",
          }}
        >
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              "& th": {
                backgroundColor: "#f1f1f1",
                fontWeight: "bold",
              },
              "& td": {
                borderBottom: "1px solid #ddd",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell key="1">Id</TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >{column.isSortBy? column.component : null}
                    {column.label}
                  </TableCell>
                ))}
                 <TableCell key="actionheader">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell key={1} colSpan={10}>
                    {" "}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress />{" "}
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={index}
                    
                    >
                      <TableCell key={index}>
                        {rowsPerPage * page + index + 1}
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                       <TableCell key={index+"action"}><Button onClick={()=>{checkMoreHandler(row)}}>More</Button></TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalPages}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal handleClose={handleClose} open={open} tableData={extraTableInfo} />
    </>
  );
}
