import React, { useEffect, useState } from "react";
import {
  useAllRegisterContentLazyQuery,
  useAddRegisterContentMutation,
  useUpdateRegisterContentMutation,
} from "../../generated/graphql";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Button,
  TextField,
  Input,
  Stack,
  styled,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Modal from "@mui/material/Modal";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
function Index() {
  const router = useRouter();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "650px",
    height: "650px",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    margin: "12px",
  };
  const styleForAdding = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    margin: "12px",
  };
  const [location, setLocation] = useState([]);
  const [locationName, setLocationName] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [success, setSuccess] = useState("");
  const [updateRegisterContent] = useUpdateRegisterContentMutation();
  const [letterHead, setLetterHead] = useState("");
  const [fileName, setFileName] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [edited, setEdited] = useState([]);
  const [fileEdited, setFileEdited] = useState([]);
  const [editedId, setEditedId] = useState([]);
  const [addRegisterContent] = useAddRegisterContentMutation();
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
      field: "registerContent",
      headerName: "Register Content",
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
                  const old = ind.registerContent;
                  ind.registerContent = String(e.target.value);
                  if (edited.length !== 0) {
                    const ret = edited.findIndex((indx) => indx.id === ind.id);
                    console.log(editedId);
                    console.log(edited);
                    if (ret === -1) {
                      setEdited([
                        ...edited,
                        {
                          registerContent: ind.registerContent,
                          id: ind.id,
                        },
                      ]);
                      setEditedId([...editedId, ind.id]);
                    } else {
                      const newEdited = [...edited];
                      newEdited[ret]["registerContent"] = ind.registerContent;
                      setEdited(newEdited);
                    }
                  } else {
                    setEdited([
                      {
                        registerContent: ind.registerContent,
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
      field: "imageUrl",
      headerName: "Image",
      width: 200,
      renderCell: (cellValues) => {
        return cellValues.formattedValue !== null ? (
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
              console.log(cellValues);
              setLetterHead(cellValues.formattedValue);
            }}
          >
            View
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              setError("The user has not uploaded a company image yet!");
            }}
          >
            View
          </LoadingButton>
        );
      },
    },
    {
      field: "updateImage",
      headerName: "Update Image",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
                setFileUrl(URL.createObjectURL(e.target.files[0]));
                console.log("This is", cellValues.row.id);
                setOpenModal(true);
              }}
            />
            <Button
              variant="contained"
              component="span"
              onClick={() => setEditedId(cellValues.row.id)}
            >
              Upload
            </Button>
          </label>
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
  const [allRegisterContentQuery] = useAllRegisterContentLazyQuery();
  const handleChange = async () => {
    setLoading(true);
    setSuccess("");
    if (input === "") {
      setError("Input Field Cannot Be Empty");
      setLoading(false);
    } else if (locationName.includes(input)) {
      setError("Register Content already present");
      setLoading(false);
    } else if (file === undefined || fileName === "") {
      setError("No Image Uploaded!");
      setLoading(false);
    } else {
      setError("");
      let uploadData;
      if (file && fileName) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "register-content-uploads");
        formData.append(
          "public_id",
          fileName + "_" + Math.round(Date.now() / 1000)
        );

        uploadData = await fetch(
          "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
          { method: "POST", body: formData }
        ).then((r) => r.json());
      }
      const response = await addRegisterContent({
        variables: {
          input: {
            registerContent: input,
            imageUrl: uploadData.secure_url,
            type: "employer",
            active: true,
          },
        },
      });
      setLoading(false);
      setLocation([
        ...location,
        {
          id: response.data.addRegisterContent._id,
          registerContent: input,
          imageUrl: uploadData.secure_url,
          active: true,
        },
      ]);
      setLocationName((prev) => [...prev, input]);
      setOpen(false);
      console.log(response);
      setSuccess("Register Content added successfully!");
      setInput("");
    }
  };
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === undefined || loggedIn === "false" || loggedIn === null) {
      router.push("/login");
    }
    const func = async () => {
      const response = await allRegisterContentQuery({
        fetchPolicy: "network-only",
      });
      const locations = response.data.allRegisterContent;
      const newLocations = [];
      locations.forEach((obj, i) => {
        if (obj.type === "employer") {
          newLocations.push({
            id: obj._id,
            registerContent: obj.registerContent,
            imageUrl: obj.imageUrl,
            active: obj.active,
          });
        }
      });
      const nLocations = [];
      locations.forEach((obj, i) => nLocations.push(obj.registerContent));
      setLocation(newLocations);
      setLocationName(nLocations);
      console.log(response);
    };
    func();
    setFirstLoading(false);
  }, []);

  const handleSaveClick = () => {
    console.log(edited);
    if (edited.length !== 0) {
      setSaveLoading(true);
      edited.forEach(async (each, id) => {
        const response = await updateRegisterContent({
          variables: {
            input: {
              id: each.id,
              registerContent: each.registerContent,
              imageUrl: each.imageUrl,
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
  const Input = styled("input")({
    display: "none",
  });

  const handleUpdateImageSave = async () => {
    setLoading(true);
    if (editedId.length !== 0) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "login-content-uploads");
      formData.append(
        "public_id",
        fileName + "_" + Math.round(Date.now() / 1000)
      );
      const uploadData = await fetch(
        "https://api.cloudinary.com/v1_1/inradiuscloud/image/upload",
        { method: "POST", body: formData }
      ).then((r) => r.json());
      const newL = [...location];
      editedId.length !== 0 &&
        updateRegisterContent({
          variables: {
            input: {
              id: editedId,
              imageUrl: uploadData.secure_url,
            },
          },
        });
      newL.forEach((ind) => {
        if (ind.id === editedId) {
          ind.imageUrl = uploadData.secure_url;
        }
      });
      setLocation(newL);
      setLoading(false);
      setOpenModal(false);
      setSuccess("Image Updated and Saved Successfully");
      setEditedId("");
    } else {
      setLoading(false);
      setOpenModal(false);
      setSuccess("Image Uploaded Successfully");
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
            Employer Register Content
          </Typography>
          <DataGrid
            rows={location}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
          <div style={{ marginTop: "12px" }}>
            <Button variant="contained" onClick={handleOpen}>
              Add Register Content
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
        <Box sx={styleForAdding}>
          <Stack spacing={2}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ color: "black" }}
            >
              Enter The Register Content
            </Typography>
            <TextField
              variant="outlined"
              id="component-outlined"
              value={input}
              fullWidth
              margin="dense"
              onChange={(e) => setInput(e.target.value)}
              label="Register Content"
            />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={(e) => {
                  console.log(e.target.files[0].name);
                  setFileName(e.target.files[0].name);
                  setFile(e.target.files[0]);
                }}
              />
              <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Button variant="contained" component="span">
                  Upload
                </Button>
                <Typography noWrap={true}>
                  {fileName !== "" && fileName}
                </Typography>
              </Stack>
            </label>
            <LoadingButton
              variant="contained"
              style={{ marginTop: "12px" }}
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
      {(letterHead !== "" || fileUrl !== "") && (
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setLetterHead("");
            setFileUrl("");
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Stack>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                style={{ marginBottom: "8px", color: "black" }}
              >
                {letterHead !== "" ? "Image" : "Uploaded Image"}
              </Typography>
              <div style={{ marginBottom: "12px" }}>
                <Image
                  src={letterHead !== "" ? letterHead : fileUrl}
                  layout="responsive"
                  objectFit="contain"
                  width={"400px"}
                  height={"330px"}
                />
              </div>
              {fileUrl !== "" && (
                <LoadingButton
                  variant="contained"
                  style={{ marginTop: "12px" }}
                  onClick={handleUpdateImageSave}
                  loading={loading}
                >
                  Submit
                </LoadingButton>
              )}
            </Stack>
          </Box>
        </Modal>
      )}
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
