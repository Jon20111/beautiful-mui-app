import { DataGrid, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { contactData } from "../../Data/ContactData";

const handlePrint = (cellValues: GridRenderCellParams) => {
  console.log(cellValues);
}

const datagridSx = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "primary.main",
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
      fontSize: 16
    }
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      "&:nth-of-type(2n)": {
        backgroundColor: "grid.main"
      }
    }
  }
}

const getColumns = () => {
  return [
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      renderCell: (cellValues: GridRenderCellParams<string>) => {
        return (
          <Box
            sx={{
              color: "primary.main",
              fontSize: 18,
              fontWeight: "bold"
            }}
          >
            {cellValues.value}
          </Box>
        )
      }
    },
    {
      field: "role",
      headerName: "Role"
    },
    {
      field: "skills",
      headerName: "Skills",
      renderCell: (cellValues: GridRenderCellParams<string[]>) => {
        return (
          <div>
            {cellValues.value ? cellValues.value[0] : ""}
          </div>
        )
      }
    },
    {
      field: "startDate",
      headerName: "Start Date"
    },
    {
      field: "preference",
      headerName: "Work Preference"
    },
    {
      field: "Print",
      renderCell: (cellValues: GridRenderCellParams) => {
        return (
          <Button
            variant="contained"
            onClick={()=>{
              handlePrint(cellValues);
            }}
          >
            Print
          </Button>
        )
      }
    }
  ]
}

export default function ContactDataGrid() {
  const rows = [...contactData];
  return (
    <div style={{ height: 500 }}>
      <DataGrid
        rows={rows}
        columns={getColumns()}
        headerHeight={60}
        rowHeight={120}
        pageSize={5}
        sx={datagridSx}
        components={{
          Toolbar: () => <GridToolbar sx={{justifyContent: "flex-end", "& .MuiBox-root": {display: "none"}, "& button": {border: "none"}}}></GridToolbar>
        }}
        initialState={{
          sorting: { sortModel: [{field: "name", sort: "asc"}]}
        }}
      />
    </div>
  )
}