import React, { useEffect, useState } from "react";
import {
  useAllSkillsLazyQuery,
  useAddSkillMutation,
  useUpdateSkillMutation,
} from "../../generated/graphql";
import {
  Typography,
  Button,
  TextField,
  CircularProgress,
  Stack,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import Switch from "@mui/material/Switch";
function Index() {
  const [locationName, setLocationName] = useState([]);
  const [edited, setEdited] = useState([]);
  const [success, setSuccess] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [editedId, setEditedId] = useState([]);
  const [updateSkill] = useUpdateSkillMutation();
  const columns = [
    {
      field: "skill",
      headerName: "Skill",
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
            value={cellValues.row.skill}
            onChange={(e) => {
              const newL = [...location];
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.skill;
                  ind.skill = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(editedId);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          skill: ind.skill,
                          id: ind.id,
                        },
                      ]);
                      setEditedId([...editedId, ind.id]);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["skill"] = ind.skill;
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        skill: ind.skill,
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
    setSuccess("");
    setOpenSnackbar(false);
    setError("");
  };
  const [allSkillsQuery] = useAllSkillsLazyQuery();
  const [addSkill] = useAddSkillMutation();
  const handleChange = async () => {
    setLoading(true);
    setSuccess("");
    if (input === "") {
      setError("Input Field Cannot Be Empty");
      setLoading(false);
    } else if (locationName.includes(input)) {
      setError("Skill already present");
      setLoading(false);
    } else {
      console.log(locationName.includes(input));
      setError("");
      const response = await addSkill({
        variables: {
          input: {
            skill: input,
            active: true,
          },
        },
      });
      setLoading(false);
      setLocation([
        ...location,
        {
          id: response.data.addSkill._id,
          skill: input,
          active: true,
        },
      ]);
      setLocationName((prev) => [...prev, input]);
      setOpen(false);
      setInput("");
      setSuccess("Skill added successfully!");
      console.log(location);
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
    const func = async () => {
      const response = await allSkillsQuery({
        fetchPolicy: "network-only",
      });
      const locations = response.data.allSkills;
      const newLocations = [];
      locations.forEach((obj, i) =>
        newLocations.push({
          id: obj._id,
          skill: obj.skill,
          active: obj.active,
        })
      );
      const nLocations = [];
      locations.forEach((obj, i) => nLocations.push(obj.skill));
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
        const response = await updateSkill({
          variables: {
            input: {
              id: each.id,
              skill: each.skill,
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
            Skills
          </Typography>
          <DataGrid
            rows={location}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
          <div style={{ marginTop: "12px" }}>
            <Button variant="contained" onClick={handleOpen}>
              Add Skills
            </Button>
            <LoadingButton
              loading={saveLoading}
              onClick={handleSaveClick}
              variant="contained"
              style={{ marginLeft: "12px" }}
            >
              Push Updates
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
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter The Skill
            </Typography>
            <TextField
              variant="outlined"
              id="component-outlined"
              value={input}
              fullWidth
              onChange={(e) => setInput(e.target.value)}
              label="Skill"
            />
            <LoadingButton
              variant="contained"
              onClick={handleChange}
              loading={loading}
            >
              Submit
            </LoadingButton>
          </Stack>
        </Box>
      </Modal>
      {error !== "" ? (
        <Snackbar
          open={error === "" ? false : true}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
