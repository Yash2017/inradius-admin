import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useGetInfoEmployeesLazyQuery } from "../../generated/graphql";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import { Typography, Button, TextField, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
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
    setError("");
  };
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(null);
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [letterHead, setLetterHead] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [getInfoEmployeesQuery] = useGetInfoEmployeesLazyQuery();
  const columns = [
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
      field: "gender",
      headerName: "Gender",
      width: 250,
    },
    {
      field: "currentAddress",
      headerName: "Current Address",
      width: 250,
    },
    {
      field: "dob",
      headerName: "Date of Birth",
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
      field: "shortDescription",
      headerName: "Short Description",
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
      field: "subDomain4",
      headerName: "Sub-Domain 4",
      width: 250,
    },
    {
      field: "fresher",
      headerName: "Fresher",
      width: 250,
    },
    {
      field: "totalExp",
      headerName: "Total Experience",
      width: 250,
    },
    {
      field: "relevantExp",
      headerName: "Relevant Experience",
      width: 250,
    },
    {
      field: "currentPay",
      headerName: "Current Pay",
      width: 250,
    },
    {
      field: "expectedPay",
      headerName: "Expected Pay",
      width: 250,
    },
    {
      field: "resume",
      headerName: "Resume",
      width: 200,
      renderCell: (cellValues) => {
        return cellValues.formattedValue !== null ? (
          <Link href={cellValues.formattedValue} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="contained">View</Button>
            </a>
          </Link>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              cellValues.formattedValue === null
                ? setError("The user has not uploaded a resume yet!")
                : null;
            }}
          >
            View{" "}
          </Button>
        );
      },
    },
    {
      field: "image",
      headerName: "User Image",
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
      field: "linkedIn",
      headerName: "LinkedIn",
      width: 250,
      renderCell: (cellValues) => {
        return cellValues.formattedValue !== null ? (
          <Link href={cellValues.formattedValue} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="contained">View </Button>
            </a>
          </Link>
        ) : (
          <Button
            variant="contained"
            onClick={() =>
              setError("The user has not added a linkedin link yet!")
            }
          >
            View{" "}
          </Button>
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
      const response = await getInfoEmployeesQuery({
        fetchPolicy: "network-only",
      });
      const newLocations = [];
      console.log(response.data);
      if (response.data.getAllEmployees !== []) {
        response.data.getAllEmployees.forEach((obj, i) =>
          newLocations.push({
            id: obj._id,
            firstName: obj.user.firstName,
            lastName: obj.user.lastName,
            email: obj.user.email,
            number: obj.user.number,
            gender: obj.gender !== null ? obj.gender : "",
            isAccountVerified: obj.user.isAccountVerified,
            isProfileCompleted: obj.user.isProfileCompleted,
            isSurveyCompleted: obj.user.isSurveyCompleted,
            image: obj.user.image !== null ? obj.user.image : "",
            shortDescription:
              obj.shortDescription !== null ? obj.shortDescription : "",
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
            fresher: obj.fresher !== undefined ? obj.fresher : false,
            totalExp:
              obj.totalExp !== null
                ? Number(obj.totalExp.years) * 10 + Number(obj.totalExp.months)
                : 0,
            relevantExp:
              obj.relevantExp !== null
                ? Number(obj.relevantExp.years) * 10 +
                  Number(obj.relevantExp.months)
                : 0,
            currentPay: obj.currentPay !== null ? obj.currentPay : "",
            expectedPay: obj.expectedPay !== null ? obj.expectedPay : "",
            linkedIn: obj.linkedIn !== null ? obj.linkedIn : null,
            resume: obj.resume !== null ? obj.resume : null,
            currentAddress:
              obj.currentAddress !== null ? obj.currentAddress : "",
            dob:
              obj.dob !== null
                ? String(obj.dob).substring(0, String(obj.dob).indexOf("T"))
                : "",
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

  const [value, setValue] = React.useState(0);
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
          {" "}
          <Tabs value={value} onChange={(e, num) => setValue(num)} centered>
            <Tab label="Employee" />
            <Tab
              label="Employer"
              onClick={() => router.push("/database/employer")}
            />
          </Tabs>
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
    </>
  );
}
