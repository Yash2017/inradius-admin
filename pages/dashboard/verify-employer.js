import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import {
  useGetAllEmployersLazyQuery,
  useVerifyEmployerLazyQuery,
} from "../../generated/graphql";
import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

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
    { field: "id", headerName: "ID", width: 250 },
    { field: "companyName", headerName: "Company Name", width: 300 },
    { field: "employerVerified", headerName: "Company Verified", width: 350 },
    {
      field: "Verify",
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
