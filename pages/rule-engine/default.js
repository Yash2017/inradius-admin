import React, { useEffect, useState } from "react";
import {
  useAllRulesLazyQuery,
  useAddSurveyMutation,
  useUpdateRuleMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField, Tab, Tabs } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Switch from "@mui/material/Switch";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";

function Index() {
  const router = useRouter();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [location, setLocation] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState([]);
  const [surveyQuestion, setSurveyQuestion] = useState([]);
  const [dataOptions, setDataOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [addSurveyMutation] = useAddSurveyMutation();
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [updateRule] = useUpdateRuleMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDataOptions(["", ""]);
    setOpen(false);
    console.log(dataOptions);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setError("");
  };
  const [allRulesQuery] = useAllRulesLazyQuery();
  const columns = [
    {
      field: "active",
      headerName: "Active Status",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <Switch
            checked={cellValues.row.active}
            inputProps={{ "aria-label": "controlled" }}
            onChange={(e) => {
              const newL = [...location];
              console.log(newL);
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  ind.active = !ind.active;
                  if (ind.matchType === "softMatch") {
                    ind.weightage = 0;
                  }
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(ret);
                    console.log(edited);
                    if (ret === -1) {
                      if (ind.matchType === "softMatch" && !ind.active) {
                        setEdited([
                          ...edited,
                          {
                            weightage: 0,
                            active: ind.active,
                            id: ind.id,
                          },
                        ]);
                      } else if (ind.matchType === "hardMatch") {
                        setEdited([
                          ...edited,
                          {
                            active: ind.active,
                            id: ind.id,
                          },
                        ]);
                      } else {
                        setEdited([
                          ...edited,
                          {
                            weightage: 0,
                            active: ind.active,
                            id: ind.id,
                          },
                        ]);
                      }
                      console.log(edited);
                    } else {
                      if (ind.matchType === "softMatch" && !ind.active) {
                        const newEdited = [...edited];
                        newEdited[ret]["weightage"] = 0;
                        newEdited[ret]["active"] = ind.active;
                        setEdited(newEdited);
                      } else if (ind.matchType === "hardMatch") {
                        const newEdited = [...edited];
                        newEdited[ret]["active"] = ind.active;
                        setEdited(newEdited);
                      } else {
                        const newEdited = [...edited];
                        newEdited[ret]["active"] = ind.active;
                        newEdited[ret]["weightage"] = 0;
                        setEdited(newEdited);
                      }
                    }
                  } else {
                    if (ind.matchType === "softMatch" && !ind.active) {
                      console.log(ind.active);
                      setEdited([
                        {
                          weightage: 0,
                          active: ind.active,
                          id: ind.id,
                        },
                      ]);
                      console.log("First");
                    } else if (ind.matchType === "hardMatch") {
                      setEdited([
                        {
                          active: ind.active,
                          id: ind.id,
                        },
                      ]);
                      console.log("First");
                    } else {
                      setEdited([
                        {
                          weightage: 0,
                          active: ind.active,
                          id: ind.id,
                        },
                      ]);
                    }
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
      field: "type",
      headerName: "Criterion",
      width: 300,
    },
    {
      field: "matchType",
      headerName: "Match Type",
      width: 200,
    },
    {
      field: "weightage",
      headerName: "Weightage",
      width: 200,
      renderCell: (cellValues) => {
        // if (cellValues.row.matchType === "softMatch") {
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
            value={
              cellValues.row.matchType === "softMatch"
                ? cellValues.row.weightage
                : 0
            }
            readOnly={
              cellValues.row.matchType === "softMatch"
                ? cellValues.row.active === false && true
                : true
            }
            onChange={(e) => {
              e.preventDefault();
              const newL = [...location];
              console.log(newL);
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  // const old = ind.weightage;
                  ind.weightage = e.target.value;
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(ret);
                    console.log(edited);
                    if (ret === -1) {
                      console.log("Here");
                      setEdited([
                        ...edited,
                        { weightage: ind.weightage, id: ind.id },
                      ]);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret].weightage = ind.weightage;
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([{ weightage: ind.weightage, id: ind.id }]);
                    console.log("First");
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
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
    const func = async () => {
      const response = await allRulesQuery({
        fetchPolicy: "network-only",
      });
      const question = response.data.allRule;
      const newQues = [];
      question.forEach((ind, i) => {
        newQues.push({
          type: ind.type,
          weightage: ind.weightage * 100,
          matchType: ind.matchType,
          id: ind._id,
          active: ind.active,
        });
      });
      console.log("This is new Questions", newQues);
      setLocation(newQues);
      console.log(response);
    };
    func();
  }, []);
  const handleSaveClick = () => {
    setSaveLoading(true);
    if (edited.length !== 0) {
      console.log(edited);
      edited.forEach(async (ind, i) => {
        console.log(ind.active);
        const response = await updateRule({
          variables: {
            input: {
              id: ind.id,
              weightage: ind.weightage !== 0 ? ind.weightage / 100 : 0,
              active: ind.active,
            },
          },
        });
        console.log(response);
      });
      setEdited([]);
      setSaveLoading(false);
      setSuccess("Data updated successfully!");

      //   setSaveLoading(true);
      //   edited.forEach(async (each, id) => {
      //     const response = await updateBenefit({
      //       variables: {
      //         input: {
      //           id: editedId[id],
      //           benefit: each,
      //         },
      //       },
      //     });
      //     console.log(response);
      //   });
      //   setEdited([]);
      //   setEditedId([]);
      //   setSaveLoading(false);
      //   setSuccess("Changes Saved!");
      // } else {
      //   setError("No changes made!");
    } else {
      setSaveLoading(false);
      setError("No data changed to save!");
    }
  };
  const [value, setValue] = React.useState(0);

  return location.length !== 0 ? (
    <div
      style={{
        width: "100vw",
        height: "60vh",
        color: "black",
        marginTop: "80px",
        paddingLeft: "24px",
      }}
    >
      {location !== [] && (
        <>
          <Tabs value={0} centered>
            <Tab label="Default Scoring" />
          </Tabs>
          <DataGrid
            rows={location}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
        </>
      )}
      <div style={{ marginTop: "12px" }}>
        <LoadingButton
          loading={saveLoading}
          onClick={() => handleSaveClick()}
          variant="contained"
        >
          Push Changes
        </LoadingButton>
      </div>
      {error !== "" ? (
        <Snackbar
          open={error !== "" ? true : false}
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
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
