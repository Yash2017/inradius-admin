import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useGetInfoEmployersLazyQuery } from "../../generated/graphql";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";
import Image from "next/image";
import { Typography, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
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
  const [data, setData] = React.useState(null);
  const router = useRouter();
  const [openModal, setOpenModal] = React.useState(false);
  const [letterHead, setLetterHead] = React.useState("");
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
              setLetterHead(cellValues.formattedValue);
            }}
            loading={loading}
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
        return (
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
              console.log(cellValues);
              setLetterHead(cellValues.formattedValue);
            }}
            loading={loading}
          >
            View
          </LoadingButton>
        );
      },
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
        return (
          <Link href={cellValues.formattedValue} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="contained">Click Here </Button>
            </a>
          </Link>
        );
      },
    },
    {
      field: "linkedIn",
      headerName: "LinkedIn",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <Link href={cellValues.formattedValue} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="contained">Click Here </Button>
            </a>
          </Link>
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
    const getData = async () => {
      const response = await getInfoEmployersQuery({
        fetchPolicy: "network-only",
      });
      const newLocations = [];
      const jobs = [];
      response.data.getAllEmployers.forEach((obj, i) => {
        obj.jobs.forEach((ind, i) =>
          jobs.push({
            [`${i}jobTitle`]: ind.jobTitle,
            jobDesc: ind.jobDesc,
            jobStatus: ind.jobStatus,
            jobType: ind.jobType,
            listingComplete: ind.listingComplete,
            latitude: ind.latitude,
            longitude: ind.longitude,
            location: ind.location.location,
            qualification: ind.qualification.qualification,
            industry: ind.industry.industry,
            domain: ind.domain.domain,
            skill1: ind.skills[0].skill,
            skill2: ind.skills[1].skill,
            skill3: ind.skills[2].skill,
            skill4: ind.skills[3].skill,
            subDomain1: ind.subDomain[0].subDomain,
            // subDomain2: ind.subDomain[1].subDomain,
            // subDomain3: ind.subDomain[2].subDomain,
            minPay: ind.minPay,
            maxPay: ind.maxPay,
            minRequiredExp:
              Number(ind.minRequiredExp.years) * 10 +
              Number(ind.minRequiredExp.months),
          })
        );
        newLocations.push({
          id: obj._id,
          firstName: obj.user.firstName,
          lastName: obj.user.lastName,
          email: obj.user.email,
          number: obj.user.number,
          gender: obj.gender,
          isAccountVerified: obj.user.isAccountVerified,
          isProfileCompleted: obj.user.isProfileCompleted,
          isSurveyCompleted: obj.user.isSurveyCompleted,
          companyImage: obj.companyImage,
          companyLetterHead: obj.companyLetterHead,
          companyName: obj.companyName,
          employerVerified: obj.employerVerified,
          employerVerifiedStatus: obj.employerVerifiedStatus,
          noOfHiring: obj.noOfHiring,
          noOfLocations: obj.noOfLocations,
          noOfLocations: obj.noOfLocations,
          noOfEmployees: obj.noOfEmployees,
          attritionRate: obj.attritionRate,
          lastTurnover: obj.lastTurnover,
          currentAddress: obj.currentAddress,
          benefit: obj.benefits,
          createdAt: String(obj.createdAt).substring(
            0,
            String(obj.createdAt).indexOf("T")
          ),
          updatedAt: String(obj.updatedAt).substring(
            0,
            String(obj.updatedAt).indexOf("T")
          ),
        });
      });
      setData(newLocations);
      console.log(newLocations);
    };
    getData();
  }, []);
  return (
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
      {data !== null && (
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
        />
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
              Resume
            </Typography>
            <Image src={letterHead} width={"1200px"} height={"600px"} />
          </Box>
        </Modal>
      )}
    </div>
  );
}
