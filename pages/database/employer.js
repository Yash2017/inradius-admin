import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useGetInfoEmployersLazyQuery } from "../../generated/graphql";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { Typography, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import Link from "next/link";

export default function DataTable() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setError("");
  };
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [letterHead, setLetterHead] = React.useState("");
  const [type, setType] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [getInfoEmployersQuery] = useGetInfoEmployersLazyQuery();
  const columns = [
    { field: "companyName", headerName: "Company Name", width: 270 },
    { field: "firstName", headerName: "First Name", width: 270 },
    { field: "lastName", headerName: "Last Name", width: 270 },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "number",
      headerName: "Number",
      width: 250,
    },
    {
      field: "currentAddress",
      headerName: "Current Address",
      width: 250,
    },
    {
      field: "isAccountVerified",
      headerName: "Account Verified",
      width: 250,
    },
    {
      field: "isProfileCompleted",
      headerName: "Profile Completed",
      width: 250,
    },
    {
      field: "isSurveyCompleted",
      headerName: "Survey Completed",
      width: 250,
    },
    {
      field: "employerVerified",
      headerName: "Employer Verified",
      width: 250,
    },
    {
      field: "employerVerifyStatus",
      headerName: "Employer Verified Status",
      width: 250,
    },
    {
      field: "noOfJobs",
      headerName: "Number of Jobs",
      width: 250,
    },
    {
      field: "noOfHiring",
      headerName: "Number of Hiring",
      width: 250,
    },
    {
      field: "noOfEmployees",
      headerName: "Number of Employees",
      width: 250,
    },
    {
      field: "noOfLocations",
      headerName: "Number of Locations",
      width: 250,
    },
    {
      field: "attritionRate",
      headerName: "Attrition Rate",
      width: 250,
    },
    {
      field: "lastTurnover",
      headerName: "Last Turnover",
      width: 250,
    },

    {
      field: "companyLetterHead",
      headerName: "Company Letter Head",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
              console.log(cellValues);
              if (cellValues.formattedValue === null) {
                setError("The user has not uploaded a letter head yet!");
              } else {
                setLetterHead(cellValues.formattedValue);
                setType("Company Letter Head");
              }
            }}
          >
            View
          </LoadingButton>
        );
      },
    },
    {
      field: "companyImage",
      headerName: "Company Image",
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
              setType("Company Image");
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
      field: "createdAt",
      headerName: "Created At",
      width: 250,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 250,
    },
  ];
  React.useEffect(() => {
    setLoading(true);
    const getData = async () => {
      setLoading(true);
      const response = await getInfoEmployersQuery({
        fetchPolicy: "network-only",
      });
      const newLocations = [];
      response.data.getAllEmployers.forEach((obj, i) => {
        let temp = {};
        (temp["id"] = obj._id),
          (temp["firstName"] = obj.user.firstName),
          (temp["lastName"] = obj.user.lastName),
          (temp["email"] = obj.user.email),
          (temp["number"] = obj.user.number),
          (temp["isAccountVerified"] = obj.user.isAccountVerified),
          (temp["isProfileCompleted"] = obj.user.isProfileCompleted),
          (temp["isSurveyCompleted"] = obj.user.isSurveyCompleted),
          (temp["companyImage"] = obj.companyImage),
          (temp["companyLetterHead"] = obj.companyLetterHead),
          (temp["companyName"] = obj.companyName),
          (temp["employerVerified"] = obj.employerVerified),
          (temp["employerVerifyStatus"] = obj.employerVerifyStatus),
          (temp["noOfHiring"] = obj.noOfHiring),
          (temp["noOfLocations"] = obj.noOfLocations),
          (temp["noOfLocations"] = obj.noOfLocations),
          (temp["noOfEmployees"] = obj.noOfEmployees),
          (temp["attritionRate"] = obj.attritionRate),
          (temp["lastTurnover"] = obj.lastTurnover),
          (temp["currentAddress"] = obj.currentAddress),
          (temp["benefit"] = obj.benefits),
          (temp["noOfJobs"] = obj.jobs.length),
          (temp["createdAt"] = String(obj.createdAt).substring(
            0,
            String(obj.createdAt).indexOf("T")
          )),
          (temp["updatedAt"] = String(obj.updatedAt).substring(
            0,
            String(obj.updatedAt).indexOf("T")
          )),
          newLocations.push(temp);
      });
      setData(newLocations);
      console.log(newLocations);
    };
    getData();
    setLoading(false);
  }, []);
  return loading === true ? (
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
  ) : (
    <>
      {data !== null ? (
        <div
          style={{
            width: "100vw",
            height: "80vh",
            color: "black",
            marginTop: "80px",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
          />
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
      {letterHead !== "" && (
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setLetterHead("");
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
              {type}
            </Typography>
            <Image src={letterHead} width={"1200px"} height={"600px"} />
          </Box>
        </Modal>
      )}
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
    </>
  );
}
