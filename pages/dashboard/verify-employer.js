import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  useGetAllEmployersLazyQuery,
  useVerifyEmployerLazyQuery,
} from "../../generated/graphql";
import { LoadingButton } from "@mui/lab";
import { Alert, Snackbar } from "@mui/material";

export default function DataTable() {
  const [data, setData] = React.useState(null);
  const [verifyEmployerQuery] = useVerifyEmployerLazyQuery();
  const [loading, setLoading] = React.useState(false);
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
            onClick={(e) => handleClick(e, cellValues)}
            loading={loading}
          >
            Verify
          </LoadingButton>
        );
      },
    },
  ];
  React.useEffect(() => {
    const getData = async () => {
      const response = await getAllEmployersQuery({
        fetchPolicy: "network-only",
      });
      const newLocations = [];
      response.data.getAllEmployers.forEach((obj, i) =>
        newLocations.push({
          id: obj._id,
          companyName: obj.companyName,
          employerVerified: obj.employerVerified,
        })
      );
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
      {companyName !== "" ? (
        <Snackbar
          open={companyName !== "" ? true : false}
          autoHideDuration={6000}
          onClose={() => companyName("")}
        >
          <Alert onClose={() => companyName("")} severity="success">
            {companyName} is verified!
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
}
