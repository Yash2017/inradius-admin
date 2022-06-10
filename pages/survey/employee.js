import React, { useEffect, useState } from "react";
import {
  useAllSurveyQuestionLazyQuery,
  useAddSurveyMutation,
  useUpdateSurveyMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField } from "@mui/material";
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
  const [updateSurveyMutation] = useUpdateSurveyMutation();
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState([]);
  const [surveyQuestion, setSurveyQuestion] = useState([]);
  const [dataOptions, setDataOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [addSurveyMutation] = useAddSurveyMutation();
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [success, setSuccess] = useState("");
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
  const [allSurveyQuestionQuery] = useAllSurveyQuestionLazyQuery();
  const handleChange = async () => {
    setLoading(true);
    console.log(dataOptions.includes(""));
    console.log("True");
    if (input === "") {
      setError("Question Cannot Be Empty");
      setLoading(false);
    } else if (dataOptions.includes("")) {
      setError("Options Cannot Be Empty");
      setLoading(false);
    } else if (surveyQuestion.includes(dataOptions)) {
      setError("Question already exists");
      setLoading(false);
    } else {
      setError("");
      const response = await addSurveyMutation({
        variables: {
          input: {
            question: input,
            options: dataOptions,
            type: "employee",
            active: true,
          },
        },
      });
      const newSurvey = {};
      dataOptions.forEach((option, i) => {
        newSurvey[`option${i + 1}`] = option;
      });
      newSurvey["question"] = input;
      setSurveyQuestion([...surveyQuestion, input]);
      newSurvey["id"] = response.data.addSurvey._id;
      setLocation([...location, newSurvey]);
      setInput("");
      setDataOptions(["", ""]);
      setAddOpen(false);
      setLoading(false);
      console.log(response);
    }
  };
  const columns = [
    {
      field: "question",
      headerName: "Question",
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
            value={cellValues.row.question}
            onChange={(e) => {
              e.preventDefault();
              const newL = [...location];
              console.log(newL);
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.question;
                  ind.question = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(ret);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        { question: ind.question, id: ind.id },
                      ]);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret].question = ind.question;
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([{ question: ind.question, id: ind.id }]);
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
    {
      field: "option1",
      headerName: "Option 1",
      width: 250,
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
            value={cellValues.row.option1}
            onChange={(e) => {
              const newL = [...location];
              console.log(newL);
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.option1;
                  console.log(ind);
                  ind.option1 = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(ret);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          option: [
                            ind.option1,
                            ind.option2,
                            ind.option3,
                            ind.option4,
                          ],
                          id: ind.id,
                        },
                      ]);
                      console.log(edited);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["option"] = [
                        ind.option1,
                        ind.option2,
                        ind.option3,
                        ind.option4,
                      ];
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        option: [
                          ind.option1,
                          ind.option2,
                          ind.option3,
                          ind.option4,
                        ],
                        id: ind.id,
                      },
                    ]);
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
    {
      field: "option2",
      headerName: "Option 2",
      width: 250,
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
            value={cellValues.row.option2}
            onChange={(e) => {
              const newL = [...location];
              console.log(newL);
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.option2;
                  ind.option2 = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(ret);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          option: [
                            ind.option1,
                            ind.option2,
                            ind.option3,
                            ind.option4,
                          ],
                          id: ind.id,
                        },
                      ]);
                      console.log(edited);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["option"] = [
                        ind.option1,
                        ind.option2,
                        ind.option3,
                        ind.option4,
                      ];
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        option: [
                          ind.option1,
                          ind.option2,
                          ind.option3,
                          ind.option4,
                        ],
                        id: ind.id,
                      },
                    ]);
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
    {
      field: "option3",
      headerName: "Option 3",
      width: 250,
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
            value={cellValues.row.option3}
            onChange={(e) => {
              const newL = [...location];
              console.log(newL);
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.option3;
                  ind.option3 = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(ret);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          option: [
                            ind.option1,
                            ind.option2,
                            ind.option3,
                            ind.option4,
                          ],
                          id: ind.id,
                        },
                      ]);
                      console.log(edited);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["option"] = [
                        ind.option1,
                        ind.option2,
                        ind.option3,
                        ind.option4,
                      ];
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        option: [
                          ind.option1,
                          ind.option2,
                          ind.option3,
                          ind.option4,
                        ],
                        id: ind.id,
                      },
                    ]);
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
    {
      field: "option4",
      headerName: "Option 4",
      width: 250,
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
            value={cellValues.row.option4}
            onChange={(e) => {
              const newL = [...location];
              console.log(newL);
              newL.forEach((ind) => {
                if (ind.id === cellValues.row.id) {
                  const old = ind.option4;
                  ind.option4 = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(ret);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          option: [
                            ind.option1,
                            ind.option2,
                            ind.option3,
                            ind.option4,
                          ],
                          id: ind.id,
                        },
                      ]);
                      console.log(edited);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["option"] = [
                        ind.option1,
                        ind.option2,
                        ind.option3,
                        ind.option4,
                      ];
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        option: [
                          ind.option1,
                          ind.option2,
                          ind.option3,
                          ind.option4,
                        ],
                        id: ind.id,
                      },
                    ]);
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
    {
      field: "active",
      headerName: "Active Status",
      width: 250,
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
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(ret);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          active: ind.active,
                          id: ind.id,
                        },
                      ]);
                      console.log(edited);
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
      const response = await allSurveyQuestionQuery({
        fetchPolicy: "network-only",
        type: "employee",
      });
      const question = response.data.allSurveyQuestion;
      const newQues = [];
      question.forEach((ind, i) => {
        if (ind.type === "employee") {
          const newSurvey = {};
          ind.options.forEach((option, i) => {
            newSurvey[`option${i + 1}`] = option;
          });
          newSurvey["question"] = ind.question;
          setSurveyQuestion([...surveyQuestion, ind.question]);
          newSurvey["id"] = ind._id;
          newSurvey["active"] = ind.active;
          newQues.push(newSurvey);
        }
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
      if (edited.findIndex((ind, i) => ind.question === "") !== -1) {
        setError("Question Cannot Be Empty!");
        setSaveLoading(false);
      } else {
        edited.forEach(async (ind, i) => {
          var newOption = [];
          if (ind.option !== null && ind.option !== undefined) {
            newOption = ind.option.filter((ind) => ind !== undefined);
          }
          const response = await updateSurveyMutation({
            variables: {
              input: {
                id: ind.id,
                question: ind.question,
                options: newOption.length !== 0 ? newOption : ind.option,
                active: ind.active,
              },
            },
          });
          console.log(response);
        });
        setEdited([]);
        setSaveLoading(false);
        setSuccess("Data updated successfully!");
      }
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
      <Typography variant="h5" style={{ marginBottom: "7px", color: "black" }}>
        Employee Survey Questions
      </Typography>

      <Modal
        open={addOpen}
        onClose={() => {
          setAddOpen(false);
        }}
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
            Question
          </Typography>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={input}
            //value={input}
            fullWidth
            style={{ marginBottom: "12px", color: "black" }}
            margin="dense"
            onChange={(e) => setInput(e.target.value)}
            label="Question"
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ marginBottom: "7px", color: "black" }}
          >
            Options
          </Typography>
          {dataOptions.map((ind, i) => (
            <TextField
              key={i}
              variant="outlined"
              id="component-outlined"
              value={ind}
              //value={input}
              fullWidth
              margin="dense"
              onChange={(e) => {
                let copy = [...dataOptions];
                copy[i] = e.target.value;
                setDataOptions([...copy]);
              }}
              label={`Option ${i + 1}`}
            />
          ))}
          <LoadingButton
            variant="contained"
            style={{ marginTop: "12px" }}
            onClick={handleChange}
            loading={loading}
          >
            Submit
          </LoadingButton>
          <Button
            style={{ marginTop: "12px", marginLeft: "12px" }}
            variant="contained"
            onClick={() =>
              dataOptions.length < 4
                ? setDataOptions([...dataOptions, ""])
                : setError("You Can't Add More Than 4 Options")
            }
          >
            Add Option
          </Button>
        </Box>
      </Modal>
      {location !== [] && (
        <DataGrid
          rows={location}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
      )}
      <div style={{ marginTop: "12px" }}>
        <Button variant="contained" onClick={() => setAddOpen(true)}>
          Add Survey
        </Button>
        <LoadingButton
          loading={saveLoading}
          onClick={() => handleSaveClick()}
          variant="contained"
          style={{ marginLeft: "12px" }}
        >
          Save
        </LoadingButton>
      </div>
      {error !== "" ? (
        <Snackbar
          open={error !== "" ? true : false}
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
