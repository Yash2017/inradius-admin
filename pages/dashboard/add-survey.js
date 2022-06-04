import React, { useEffect, useState } from "react";
import {
  useAllSurveyQuestionLazyQuery,
  useAddSurveyMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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
  const [data, setData] = useState(null);
  const [surveyType, setSurveyType] = useState("employee");
  const [dataOptions, setDataOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [addSurveyMutation] = useAddSurveyMutation();
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false);
    setError("");
  };
  const [allSurveyQuestionQuery] = useAllSurveyQuestionLazyQuery();
  const handleChange = async () => {
    setLoading(true);
    console.log(dataOptions.includes(""));
    if (dataOptions.includes("")) {
      setError("Options Cannot Be Empty");
      setLoading(false);
    } else if (input === "") {
      setError("Question Cannot Be Empty");
      setLoading(false);
    } else {
      setError("");
      const response = await addSurveyMutation({
        variables: {
          input: {
            question: input,
            options: dataOptions,
            type: surveyType,
          },
        },
      });
      setLoading(false);
      setLocation([
        ...location,
        { question: input, options: dataOptions, type: surveyType },
      ]);
      setInput("");
      setAddOpen(false);
      console.log(response);
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
    const func = async () => {
      const response = await allSurveyQuestionQuery();
      setLocation(response.data.allSurveyQuestion);
      console.log(response.data);
    };
    func();
  }, []);
  const handleQuestionClick = (e, ind) => {
    setOpen(true);
    setData(ind);
    setDataOptions(ind.options);
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "40vh",
        color: "black",
        marginTop: "80px",
        paddingLeft: "24px",
      }}
    >
      <Typography variant="h5">Survey Questions</Typography>
      {location !== [] &&
        location.map((ind, i) => (
          <Button
            variant="contained"
            onClick={(e) => handleQuestionClick(e, ind)}
            style={{ margin: "12px" }}
          >{`Question ${i + 1}`}</Button>
        ))}
      <Button
        variant="contained"
        onClick={() => setAddOpen(true)}
        style={{ margin: "12px" }}
      >
        Add Survey
      </Button>
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            displayEmpty
            style={{ marginBottom: "12px", color: "black" }}
            value={surveyType}
            //label="Survey Type"
            onChange={(e) => setSurveyType(e.target.value)}
          >
            <MenuItem value={"employee"}>Employee</MenuItem>
            <MenuItem value={"employer"}>Employer</MenuItem>
          </Select>
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
      {data !== null && (
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
              Question
            </Typography>
            <TextField
              variant="outlined"
              id="component-outlined"
              value={data.question}
              //value={input}
              fullWidth
              margin="dense"
              onChange={(e) => setData({ ...data, question: e.target.value })}
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
          </Box>
        </Modal>
      )}
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
