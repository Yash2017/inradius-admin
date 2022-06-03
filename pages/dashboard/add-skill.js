import React, { useEffect, useState } from "react";
import {
  useAllSkillsLazyQuery,
  useAddSkillMutation,
} from "../../generated/graphql";
import { Typography, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
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
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setipen(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const [allSkillsQuery] = useAllSkillsLazyQuery();
  const [addSkill] = useAddSkillMutation();
  const handleChange = async () => {
    setLoading(true);
    if (input === "") {
      setError("Input Field Cannot Be Empty");
      setLoading(false);
    } else if (location.includes(input)) {
      setError("Skill already present");
      setLoading(false);
    } else {
      console.log(location.includes(input));
      setError("");
      const response = await addSkill({
        variables: {
          input: {
            skill: input,
          },
        },
      });
      setLoading(false);
      setInput("");
      setLocation((prev) => [...prev, input]);
      setOpen(false);
      console.log(location);
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
    const func = async () => {
      const response = await allSkillsQuery();
      const locations = response.data.allSkills;
      const newLocations = [];
      locations.forEach((obj, i) => newLocations.push(obj.skill));
      setLocation(newLocations);
      console.log(newLocations);
    };
    func();
  }, []);

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
      <Typography variant="h5">Available Skills</Typography>
      {location !== [] &&
        location.map((single, i) => {
          return (
            <div key={i}>
              <Typography variant="h6">{single}</Typography>
            </div>
          );
        })}
      <Button variant="contained" onClick={handleOpen}>
        Add Skills
      </Button>
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
            Enter The Skill
          </Typography>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={input}
            fullWidth
            margin="dense"
            onChange={(e) => setInput(e.target.value)}
            label="Skill"
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
          open={openSnackbar}
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
