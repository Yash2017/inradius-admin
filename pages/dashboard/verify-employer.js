import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  useGetAllEmployersLazyQuery,
  useVerifyEmployerLazyQuery,
} from "../../generated/graphql";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";
import Image from "next/image";
import { Typography, Button, TextField } from "@mui/material";
import Link from "next/link";

export default function DataTable() {
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
  };
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
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [verifyEmployerQuery] = useVerifyEmployerLazyQuery();
  const [openModal, setOpenModal] = React.useState(false);
  const [letterHead, setLetterHead] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [pageLoading, setPageLoading] = React.useState(true);
  const [companyName, setCompanyName] = React.useState("");
  const handleClick = async (e, cell) => {
    setLoading(true);
    const res = await verifyEmployerQuery({
      variables: {
        input: { _id: cell.id, employerVerified: true },
      },
    });
    //console.log(res);
    const response = await getAllEmployersQuery();
    const newLocations = [];
    data.forEach((obj, i) => {
      if (obj.id === cell.id) {
        newLocations.push({
          id: obj.id,
          companyName: obj.companyName,
          employerVerified: true,
        });
        setCompanyName(obj.companyName);
      } else {
        newLocations.push({
          id: obj.id,
          companyName: obj.companyName,
          employerVerified: obj.employerVerified,
        });
      }
    });
    console.log(newLocations);
    setData(newLocations);
    setLoading(false);
  };
  const [getAllEmployersQuery] = useGetAllEmployersLazyQuery();
  const columns = [
    { field: "companyName", headerName: "Company Name", width: 450 },
    { field: "employerVerified", headerName: "Company Verified", width: 250 },
    {
      field: "Verify",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <LoadingButton
            variant="contained"
            color="primary"
            loading={loading}
            onClick={(e) => handleClick(e, cellValues)}
          >
            Verify
          </LoadingButton>
        );
      },
    },
    {
      field: "companyLetterHead",
      headerName: "Company Letter Head",
      width: 200,
      renderCell: (cellValues) => {
        return cellValues.formattedValue !== null ? (
          <Link href={cellValues.formattedValue} passHref>
            <a target="_blank" rel="noopener noreferrer">
              <Button variant="contained">Click Here </Button>
            </a>
          </Link>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              cellValues.formattedValue === null
                ? setError(
                    "The user has not uploaded a company letter head yet!"
                  )
                : null;
            }}
          >
            Click Here{" "}
          </Button>
        );
      },
    },
  ];
  React.useEffect(() => {
    const getData = async () => {
      setPageLoading(true);
      const response = await getAllEmployersQuery({
        fetchPolicy: "network-only",
      });
      const newLocations = [];
      response.data.getAllEmployers.forEach((obj, i) => {
        if (obj.employerVerifyStatus === "DocumentsUploaded") {
          newLocations.push({
            id: obj._id,
            companyName: obj.companyName,
            employerVerified: obj.employerVerified,
            companyLetterHead:
              obj.companyLetterHead !== null ? obj.companyLetterHead : null,
          });
        }
      });
      setData(newLocations);
      console.log(newLocations);
    };
    getData();
    setPageLoading(false);
  }, []);
  return (
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
      {companyName !== "" ? (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={companyName !== "" ? true : false}
          autoHideDuration={6000}
          onClose={() => setCompanyName("")}
        >
          <Alert onClose={() => setCompanyName("")} severity="success">
            {companyName} is verified!
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
              Company Letterhead
            </Typography>
            <Image
              src={letterHead}
              layout={"responsive"}
              width={"400px"}
              height={"600px"}
            />
          </Box>
        </Modal>
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
    </>
  );
}
