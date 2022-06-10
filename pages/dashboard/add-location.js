import React, { useEffect, useState } from "react";
import {
  useAllLocationsLazyQuery,
  useAddLocationMutation,
  useUpdateLocationMutation,
} from "../../generated/graphql";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Typography, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
function Index() {
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
  const [locationName, setLocationName] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [edited, setEdited] = useState([]);
  const [editedId, setEditedId] = useState([]);
  const [updateLocation] = useUpdateLocationMutation();
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setError("");
    setSuccess("");
  };
  const columns = [
    {
      field: "location",
      headerName: "Location",
      width: 400,
      renderCell: (cellValues) => {
        return (
          <input
            style={{
              width: "100%",
              border: "0px",
              height: "100%",
              padding: "10px",
            }}
            type={"text"}
            value={cellValues.value}
            onChange={(e) => {
              const newL = [...location];
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.location;
                  ind.location = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(editedId);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          location: ind.location,
                          id: ind.id,
                        },
                      ]);
                      setEditedId([...editedId, ind.id]);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["location"] = ind.location;
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        location: ind.location,
                        id: ind.id,
                      },
                    ]);
                    setEditedId([ind.id]);
                  }
                }
              });
              setLocation(newL);
            }}
          />
        );
      },
    },
    {
      field: "active",
      headerName: "Active Status",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <Switch
            checked={cellValues.row.active}
            inputProps={{ "aria-label": "controlled" }}
            onChange={() => {
              const newL = [...location];
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  ind.active = !ind.active;
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(editedId);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          active: ind.active,
                          id: ind.id,
                        },
                      ]);
                      setEditedId([...editedId, ind.id]);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["active"] = ind.active;
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        active: ind.active,
                        id: ind.id,
                      },
                    ]);
                    setEditedId([ind.id]);
                  }
                }
              });
              setLocation(newL);
            }}
          />
        );
      },
    },
  ];
  const [allLocationsQuery] = useAllLocationsLazyQuery();
  const [addLocaton] = useAddLocationMutation();
  const handleChange = async () => {
    setLoading(true);
    setSuccess("");
    if (input === "") {
      setError("Input Field Cannot Be Empty");
      setLoading(false);
    } else if (locationName.includes(input)) {
      setError("Location already present");
      setLoading(false);
    } else {
      setError("");
      const response = await addLocaton({
        variables: {
          input: {
            location: input,
            active: true,
          },
        },
      });
      setLoading(false);
      setLocation([
        ...location,
        { id: response.data.addLocation._id, location: input, active: true },
      ]);
      setLocationName((prev) => [...prev, input]);
      setOpen(false);
      console.log(response);
      setSuccess("Location added successfully!");
      setInput("");
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
    const func = async () => {
      const response = await allLocationsQuery({
        fetchPolicy: "network-only",
      });
      const locations = response.data.allLocations;
      const newLocations = [];
      locations.forEach((obj, i) =>
        newLocations.push({
          id: obj._id,
          location: obj.location,
          active: obj.active,
        })
      );
      const nLocations = [];
      locations.forEach((obj, i) => nLocations.push(obj.location));
      setLocation(newLocations);
      setLocationName(nLocations);
      console.log(response);
    };
    func();
    setFirstLoading(false);
  }, []);

  const handleSaveClick = () => {
    if (edited.length !== 0) {
      setSaveLoading(true);
      edited.forEach(async (each, id) => {
        const response = await updateLocation({
          variables: {
            input: {
              id: each.id,
              location: each.location,
              active: each.active,
            },
          },
        });
        console.log(response);
      });
      setEdited([]);
      setEditedId([]);
      setSaveLoading(false);
      handleClose();
      setError("");
      setSuccess("Changes Saved!");
    } else {
      setSuccess("");
      setError("No changes made!");
    }
  };
  return firstLoading === false ? (
    <>
      {location.length !== 0 ? (
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
            Locations
          </Typography>
          <DataGrid
            rows={location}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
          <div style={{ marginTop: "12px" }}>
            <Button variant="contained" onClick={handleOpen}>
              Add Location
            </Button>
            <LoadingButton
              onClick={() => handleSaveClick()}
              loading={saveLoading}
              variant="contained"
              style={{ marginLeft: "12px" }}
            >
              Save
            </LoadingButton>
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: "0px",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
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
            Enter The Location Name
          </Typography>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={input}
            fullWidth
            margin="dense"
            onChange={(e) => setInput(e.target.value)}
            label="Location"
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
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={error === "" ? false : true}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error">
            {error}
          </Alert>
        </Snackbar>
      ) : null}
      {success !== "" ? (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={success === "" ? false : true}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {success}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  ) : (
    <div
      style={{
        marginTop: "0px",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}

export default Index;
