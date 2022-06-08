import React, { useEffect, useState } from "react";
import {
  useAllSurveyQuestionLazyQuery,
  useAddSurveyMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
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
  const [surveyQuestion, setSurveyQuestion] = useState([]);
  const [dataOptions, setDataOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [addSurveyMutation] = useAddSurveyMutation();
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDataOptions(["", ""]);
    setOpen(false);
    console.log(dataOptions);
  };
  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
    setError("");
  };
  const [allSurveyQuestionQuery] = useAllSurveyQuestionLazyQuery();
  const handleChange = async () => {
    setLoading(true);
    console.log(dataOptions.includes(""));
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
            type: "employer",
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
            type={"text"}
            value={cellValues.row.option4}
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
      });
      const question = response.data.allSurveyQuestion;
      const newQues = [];
      question.forEach((ind, i) => {
        if (ind.type === "employer") {
          const newSurvey = {};
          ind.options.forEach((option, i) => {
            newSurvey[`option${i + 1}`] = option;
          });
          newSurvey["question"] = ind.question;
          setSurveyQuestion([...surveyQuestion, ind.question]);
          newSurvey["id"] = ind._id;
          newQues.push(newSurvey);
        }
      });
      console.log("This is new Questions", newQues);
      setLocation(newQues);
      console.log(response.data);
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
      }}
    >
      <Typography variant="h5" style={{ marginBottom: "7px", color: "black" }}>
        Employer Survey Questions
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
        <LoadingButton variant="contained" style={{ marginLeft: "12px" }}>
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
    </div>
  );
}

export default Index;
