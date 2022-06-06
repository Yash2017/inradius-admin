import React, { useEffect, useState } from "react";
import {
  useAllBenefitsLazyQuery,
  useAddBenefitMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
function Index() {
  const [locationName, setLocationName] = useState([]);
  const columns = [
    {
      field: "benefit",
      headerName: "Benefit",
      width: 400,
      renderCell: (cellValues) => {
        return (
          <input
            //value={input}
            //color="white"
            style={{
              width: "100%",
              border: "0px",
              height: "100%",
              padding: "10px",
            }}
            type={"text"}
            value={cellValues.row.benefit}
            onChange={(e) => console.log(cellValues, e)}
          />
        );
      },
    },
    { field: "active", headerName: "Active", width: 250 },
    {
      field: "Toggle Active Status",
      width: 450,
      renderCell: (cellValues) => {
        return (
          <LoadingButton variant="contained" color="primary">
            Toggle Status
          </LoadingButton>
        );
      },
    },
  ];
  const router = useRouter();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [location, setLocation] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setError("");
  };
  const [allBenefitsQuery] = useAllBenefitsLazyQuery();
  const [addBenefit] = useAddBenefitMutation();
  const handleChange = async () => {
    setLoading(true);
    if (input === "") {
      setError("Input Field Cannot Be Empty");
      setLoading(false);
    } else if (locationName.includes(input)) {
      setError("Benefit already present");
      setLoading(false);
    } else {
      console.log(locationName.includes(input));
      setError("");
      const response = await addBenefit({
        variables: {
          input: {
            benefit: input,
            active: true,
          },
        },
      });
      setLoading(false);
      setLocation([
        ...location,
        {
          id: response.data.addBenefit._id,
          benefit: input,
          active: true,
        },
      ]);
      setLocationName((prev) => [...prev, input]);
      setOpen(false);
      setInput("");
      console.log(location);
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
    const func = async () => {
      const response = await allBenefitsQuery({
        fetchPolicy: "network-only",
      });
      const locations = response.data.allBenefits;
      const newLocations = [];
      locations.forEach((obj, i) =>
        newLocations.push({
          id: obj._id,
          benefit: obj.benefit,
          active: obj.active,
        })
      );
      const nLocations = [];
      locations.forEach((obj, i) => nLocations.push(obj.benefit));
      setLocation(newLocations);
      setLocationName(nLocations);
      console.log(newLocations);
    };
    func();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "60vh",
        color: "black",
        marginTop: "80px",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <Typography variant="h5" style={{ marginBottom: "12px" }}>
        Available Benefits
      </Typography>
      {location !== [] && (
        <DataGrid
          rows={location}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      )}
      <div style={{ marginTop: "12px" }}>
        <Button variant="contained" onClick={handleOpen}>
          Add Benefits
        </Button>
        <LoadingButton variant="contained" style={{ marginLeft: "12px" }}>
          Save
        </LoadingButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "7px", color: "black" }}
          >
            Enter The Benefit
          </Typography>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={input}
            fullWidth
            margin="dense"
            onChange={(e) => setInput(e.target.value)}
            label="Benefit"
          />
          <LoadingButton
            variant="contained"
            style={{ marginTop: "12px" }}
            onClick={handleChange}
            loading={loading}
          >
            Submit
          </LoadingButton>
        </Box>
      </Modal>
      {error !== "" ? (
        <Snackbar
          open={error === "" ? false : true}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}

export default Index;
