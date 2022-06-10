import React, { useEffect, useState } from "react";
import {
  useAllSubDomainsLazyQuery,
  useAllDomainsLazyQuery,
  useAddSubDomainMutation,
  useUpdateSubDomainMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import Switch from "@mui/material/Switch";
import CircularProgress from "@mui/material/CircularProgress";
function Index() {
  const [locationName, setLocationName] = useState([]);
  const [inputDomain, setInputDomain] = useState("");
  const [addSubDomain] = useAddSubDomainMutation();
  const [updateSubDomain] = useUpdateSubDomainMutation();
  const columns = [
    {
      field: "domain",
      headerName: "Domain",
      width: 400,
    },
    {
      field: "subDomain",
      headerName: "SubDomain",
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
            value={cellValues.row.subDomain}
            onChange={(e) => {
              const newL = [...location];
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.subDomain;
                  ind.subDomain = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(editedId);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          subDomain: ind.subDomain,
                          id: ind.id,
                        },
                      ]);
                      setEditedId([...editedId, ind.id]);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["subDomain"] = ind.subDomain;
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        subDomain: ind.subDomain,
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
      headerName: "Active",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <Switch
            checked={cellValues.row.active}
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
            inputProps={{ "aria-label": "controlled" }}
          />
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
  const [domain, setDomain] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState([]);
  const [success, setSuccess] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [editedId, setEditedId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess("");
    setOpenSnackbar(false);
    setError("");
  };
  const [allSubDomainsQuery] = useAllSubDomainsLazyQuery();
  const [allDomainsQuery] = useAllDomainsLazyQuery();
  const handleChange = async () => {
    setLoading(true);
    setSuccess("");
    if (input === "") {
      setError("Input Field Cannot Be Empty");
      setLoading(false);
    } else if (locationName.includes(input)) {
      setError("SubDomain already present");
      setLoading(false);
    } else {
      console.log(locationName.includes(input));
      setError("");
      const response = await addSubDomain({
        variables: {
          input: {
            domain: inputDomain.id,
            subDomain: input,
            active: true,
          },
        },
      });
      setLoading(false);
      setLocation([
        ...location,
        {
          id: response.data.addSubDomain._id,
          domain: inputDomain.domain,
          domainId: inputDomain.id,
          subDomain: input,
          active: true,
        },
      ]);
      setLocationName((prev) => [...prev, input]);
      setOpen(false);
      setInput("");
      setSuccess("SubDomain added successfully!");
      console.log(location);
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
    const func = async () => {
      const response = await allSubDomainsQuery({
        fetchPolicy: "network-only",
      });
      const responseForDomain = await allDomainsQuery({
        fetchPolicy: "network-only",
      });
      const locations = response.data.allSubDomains;
      const newLocations = [];
      const newDomain = [];
      responseForDomain.data.allDomains.forEach((obj, i) =>
        newDomain.push({
          id: obj._id,
          domain: obj.domain,
        })
      );
      setInputDomain({ domain: newDomain[0].domain, id: newDomain[0].id });
      locations.forEach((obj, i) =>
        newLocations.push({
          id: obj._id,
          subDomain: obj.subDomain,
          domain: obj.domain.domain,
          active: obj.active,
          domainId: obj.domain._id,
        })
      );
      const nLocations = [];
      locations.forEach((obj, i) => nLocations.push(obj.subDomain));
      setLocation(newLocations);
      setLocationName(nLocations);
      setDomain(newDomain);
      console.log(response);
    };
    func();
  }, []);
  const handleSaveClick = () => {
    if (edited.length !== 0 && editedId.length !== 0) {
      setSaveLoading(true);
      edited.forEach(async (each, id) => {
        const response = await updateSubDomain({
          variables: {
            input: {
              id: each.id,
              subDomain: each.subDomain,
              active: each.active,
            },
          },
        });
        console.log(response);
      });
      setEdited([]);
      setEditedId([]);
      setSaveLoading(false);
      setError("");
      setSuccess("Changes Saved!");
    } else {
      setSuccess("");
      setError("No changes made!");
    }
  };
  return (
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
            SubDomains
          </Typography>
          <DataGrid
            rows={location}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
          <div style={{ marginTop: "12px" }}>
            <Button variant="contained" onClick={handleOpen}>
              Add SubDomain
            </Button>
            <LoadingButton
              loading={saveLoading}
              onClick={handleSaveClick}
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
            Enter The SubDomain
          </Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            displayEmpty
            style={{ marginBottom: "12px", color: "black" }}
            value={inputDomain.domain}
            fullWidth
          >
            {domain.length !== 0 &&
              domain.map((ind, i) => (
                <MenuItem
                  key={i}
                  onClick={() =>
                    setInputDomain({ domain: ind.domain, id: ind.id })
                  }
                  value={ind.domain}
                >
                  {ind.domain}
                </MenuItem>
              ))}
          </Select>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={input}
            fullWidth
            margin="dense"
            onChange={(e) => setInput(e.target.value)}
            label="SubDomain"
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
  );
}

export default Index;
