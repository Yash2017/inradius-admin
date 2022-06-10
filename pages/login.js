import {
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useState, useEffect } from "react";
import { useAdminLoginLazyQuery } from "../generated/graphql";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
function Login() {
  const router = useRouter();
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      router.push("/dashboard/add-location");
    }
  }, []);
  const [adminQuery] = useAdminLoginLazyQuery();
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const Formdata = new FormData(event.currentTarget);
    const response = await adminQuery({
      variables: {
        input: {
          email: Formdata.get("email"),
          password: Formdata.get("password"),
        },
      },
    });
    if (response.error) {
      setLoading(false);
      setOpen(true);
      setError("Invalid Email or Password");
    } else {
      setLoading(false);
      localStorage.setItem("loggedIn", "true");
      router.replace("/dashboard/add-location");
    }

    console.log(response);
    console.log({
      email: Formdata.get("email"),
      password: Formdata.get("password"),
    });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Sign In
            </LoadingButton>
            {error !== "" ? (
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  {error}
                </Alert>
              </Snackbar>
            ) : null}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
