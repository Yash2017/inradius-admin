import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  useGetInfoEmployeesLazyQuery,
  useGetInfoJobsLazyQuery,
  useUpdateUserStatusLazyQuery,
} from "../generated/graphql";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import {
  Typography,
  Button,
  TextField,
  Tab,
  Tabs,
  Switch,
} from "@mui/material";
import { useRouter } from "next/router";
import { Alert, Snackbar } from "@mui/material";
import Link from "next/link";

export default function DataTable() {
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
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess("");
  };
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(null);
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [letterHead, setLetterHead] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [getInfoJobsQuery] = useGetInfoJobsLazyQuery();
  const [updateUserStatus] = useUpdateUserStatusLazyQuery();

  const columns = [
    {
      field: "userStatus",
      headerName: "Active Status",
      width: 120,
      renderCell: (cellValues) => {
        return (
          <Switch
            checked={cellValues.row.userStatus}
            inputProps={{ "aria-label": "controlled" }}
            onChange={async (e) => {
              if (cellValues.row.userStatus) {
                const response = await updateUserStatus({
                  variables: {
                    input: {
                      id: cellValues.row.userId,
                      userStatus: "blockedByAdmin",
                    },
                  },
                });
                setSuccess("User Deactivated Successfully");
              } else {
                const response = await updateUserStatus({
                  variables: {
                    input: {
                      id: cellValues.row.userId,
                      userStatus: "active",
                    },
                  },
                });
                setSuccess("User Activated Successfully");
              }
              const newData = [...data];
              const idx = newData.findIndex(
                (ind, i) => ind.id === cellValues.row.id
              );
              console.log(newData);
              newData[idx].userStatus = !newData[idx].userStatus;
              setData(newData);
            }}
          />
        );
      },
    },
    {
      field: "jobTitle",
      headerName: "Job Title",
      width: 250,
    },
    {
      field: "jobDesc",
      headerName: "Job Description",
      width: 250,
    },
    {
      field: "jobStatus",
      headerName: "Job Status",
      width: 250,
    },
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
      field: "listingComplete",
      headerName: "Listing Complete",
      width: 250,
    },
    {
      field: "radius",
      headerName: "Radius",
      width: 250,
    },
    {
      field: "latitude",
      headerName: "Latitude",
      width: 250,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      width: 250,
    },
    {
      field: "qualification",
      headerName: "Qualification",
      width: 250,
    },
    {
      field: "industry",
      headerName: "Industry",
      width: 250,
    },
    {
      field: "domain",
      headerName: "Domain",
      width: 250,
    },
    {
      field: "skill1",
      headerName: "Skill1",
      width: 250,
    },
    {
      field: "skill2",
      headerName: "Skill2",
      width: 250,
    },
    {
      field: "skill3",
      headerName: "Skill3",
      width: 250,
    },
    {
      field: "skill4",
      headerName: "Skill4",
      width: 250,
    },
    {
      field: "subDomain1",
      headerName: "Sub-Domain 1",
      width: 250,
    },
    {
      field: "subDomain2",
      headerName: "Sub-Domain 2",
      width: 250,
    },
    {
      field: "subDomain3",
      headerName: "Sub-Domain 3",
      width: 250,
    },
    {
      field: "minRequiredExp",
      headerName: "Minimum Required Experience",
      width: 250,
    },
    {
      field: "minPay",
      headerName: "Minimum Pay",
      width: 250,
    },
    {
      field: "maxPay",
      headerName: "Maximum Pay",
      width: 250,
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
      const response = await getInfoJobsQuery({
        fetchPolicy: "network-only",
      });
      const newLocations = [];
      console.log(response.data);
      if (response.data.allJobs !== []) {
        response.data.allJobs.forEach((obj, i) =>
          newLocations.push({
            id: obj._id,
            userId: obj.user._id,
            firstName: obj.user.firstName,
            lastName: obj.user.lastName,
            email: obj.user.email,
            number: obj.user.number,
            listingComplete: obj.listingComplete,
            jobTitle: obj.jobTitle !== null ? obj.jobTitle : "",
            jobType: obj.jobType !== null ? obj.jobType : "",
            jobStatus: obj.jobStatus !== null ? obj.jobStatus : "",
            jobDesc: obj.jobDesc !== null ? obj.jobDesc : "",
            radius: obj.radius !== null ? obj.radius : "",
            latitude: obj.latitude !== null ? obj.latitude : "",
            longitude: obj.longitude,
            location: obj.location !== null ? obj.location : "",
            qualification:
              obj.qualification !== null ? obj.qualification.qualification : "",
            industry: obj.industry !== null ? obj.industry.industry : "",
            domain: obj.domain !== null ? obj.domain.domain : "",
            skill1: obj.skills.length !== 0 ? obj.skills[0].skill : "",
            skill3: obj.skills.length !== 0 ? obj.skills[2].skill : "",
            skill2: obj.skills.length !== 0 ? obj.skills[1].skill : "",
            skill4: obj.skills.length !== 0 ? obj.skills[3].skill : "",
            subDomain1:
              obj.subDomain.length !== 0 ? obj.subDomain[0].subDomain : "",
            subDomain2:
              obj.subDomain.length > 1 ? obj.subDomain[1].subDomain : "",
            subDomain3:
              obj.subDomain.length > 2 ? obj.subDomain[2].subDomain : "",
            minRequiredExp:
              obj.minRequiredExp !== null
                ? Number(obj.minRequiredExp.years) * 10 +
                  Number(obj.minRequiredExp.months)
                : 0,
            minPay: obj.minPay !== null ? obj.minPay : "",
            maxPay: obj.maxPay !== null ? obj.maxPay : "",
            userStatus: obj.user.userStatus !== "blockedByAdmin" ? true : false,
            resume: obj.resume !== null ? obj.resume : null,
            createdAt: String(obj.createdAt).substring(
              0,
              String(obj.createdAt).indexOf("T")
            ),
            updatedAt: String(obj.updatedAt).substring(
              0,
              String(obj.updatedAt).indexOf("T")
            ),
          })
        );
        setData(newLocations);
        console.log(newLocations);
      } else {
        setData([]);
      }
    };
    getData();
    setLoading(false);
  }, []);
  return loading === true ? (
    <div
      style={{
        marginTop: "80px",
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
              User Image
            </Typography>
            <Image
              src={letterHead}
              layout="responsive"
              objectFit="contain"
              width={"400px"}
              height={"355px"}
            />
          </Box>
        </Modal>
      )}
      {success !== "" ? (
        <Snackbar
          open={success === "" ? false : true}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={6000}
          onClose={() => setSuccess("")}
        >
          <Alert onClose={() => setSuccess("")} severity="success">
            {success}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}
