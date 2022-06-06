import React, { useEffect, useState } from "react";
import {
  useAllQualificationsLazyQuery,
  useAddQualificationMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
export default function AddQualification() {
  const [locationName, setLocationName] = useState([]);
  const columns = [
    {
      field: "qualification",
      headerName: "Qualification",
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
            value={cellValues.row.qualification}
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
    setError("");
    setOpenSnackbar(false);
  };
  const [allQualificationsQuery] = useAllQualificationsLazyQuery();
  const [addQualification] = useAddQualificationMutation();
  const handleChange = async () => {
    setLoading(true);
    if (input === "") {
      setError("Input Field Cannot Be Empty");
      setLoading(false);
    } else if (locationName.includes(input)) {
      setError("Qualification already present");
      setLoading(false);
    } else {
      console.log(locationName.includes(input));
      setError("");
      const response = await addQualification({
        variables: {
          input: {
            qualification: input,
            active: true,
          },
        },
      });
      setLoading(false);
      setLocation([
        ...location,
        {
          id: response.data.addQualification._id,
          qualification: input,
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
      const response = await allQualificationsQuery({
        fetchPolicy: "network-only",
      });
      const locations = response.data.allQualifications;
      const newLocations = [];
      locations.forEach((obj, i) =>
        newLocations.push({
          id: obj._id,
          qualification: obj.qualification,
          active: obj.active,
        })
      );
      const nLocations = [];
      locations.forEach((obj, i) => nLocations.push(obj.qualification));
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
        Qualifications
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
          Add Qualification
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
            Enter The Qualification
          </Typography>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={input}
            fullWidth
            margin="dense"
            onChange={(e) => setInput(e.target.value)}
            label="Qualification"
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
