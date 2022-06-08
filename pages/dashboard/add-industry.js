import React, { useEffect, useState } from "react";
import {
  useAllIndustriesLazyQuery,
  useAddIndustryMutation,
  useUpdateIndustryMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import Switch from "@mui/material/Switch";
export default function Index() {
  const [locationName, setLocationName] = useState([]);
  const [edited, setEdited] = useState([]);
  const [success, setSuccess] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [editedId, setEditedId] = useState([]);
  const columns = [
    {
      field: "industry",
      headerName: "Industry",
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
            value={cellValues.row.industry}
            onChange={(e) => {
              const newL = [...location];
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.industry;
                  ind.industry = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.indexOf(old);
                    console.log(editedId);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([...edited, ind.industry]);
                      setEditedId([...editedId, ind.id]);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret] = ind.industry;
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([ind.industry]);
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
          <Switch checked={true} inputProps={{ "aria-label": "controlled" }} />
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
  const [updateIndustry] = useUpdateIndustryMutation();
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setError("");
  };
  const [allIndustriesQuery] = useAllIndustriesLazyQuery();
  const [addIndustry] = useAddIndustryMutation();
  const handleChange = async () => {
    setLoading(true);
    if (input === "") {
      setError("Input Field Cannot Be Empty");
      setLoading(false);
    } else if (locationName.includes(input)) {
      setError("Industry already present");
      setLoading(false);
    } else {
      console.log(locationName.includes(input));
      setError("");
      const response = await addIndustry({
        variables: {
          input: {
            industry: input,
            active: true,
          },
        },
      });
      setLoading(false);
      setLocation([
        ...location,
        {
          id: response.data.addIndustry._id,
          industry: input,
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
      const response = await allIndustriesQuery({
        fetchPolicy: "network-only",
      });
      const locations = response.data.allIndustries;
      const newLocations = [];
      locations.forEach((obj, i) =>
        newLocations.push({
          id: obj._id,
          industry: obj.industry,
          active: obj.active,
        })
      );
      const nLocations = [];
      locations.forEach((obj, i) => nLocations.push(obj.industry));
      setLocation(newLocations);
      setLocationName(nLocations);
      console.log(newLocations);
    };
    func();
  }, []);
  const handleSaveClick = () => {
    if (edited.length !== 0 && editedId.length !== 0) {
      setSaveLoading(true);
      edited.forEach(async (each, id) => {
        const response = await updateIndustry({
          variables: {
            input: {
              id: editedId[id],
              industry: each,
            },
          },
        });
        console.log(response);
      });
      setEdited([]);
      setEditedId([]);
      setSaveLoading(false);
      setSuccess("Changes Saved!");
    } else {
      setError("No changes made!");
    }
  };
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
        Available Industries
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
          Add Industry
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
            Enter The Industry
          </Typography>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={input}
            fullWidth
            margin="dense"
            onChange={(e) => setInput(e.target.value)}
            label="Industry"
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
      {success !== "" ? (
        <Snackbar
          open={success === "" ? false : true}
          autoHideDuration={6000}
          onClose={() => setSuccess("")}
        >
          <Alert onClose={() => setSuccess("")} severity="success">
            {success}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}
