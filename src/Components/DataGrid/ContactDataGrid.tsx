import { DataGrid, GridRenderCellParams, GridToolbar, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import { useTheme, Theme } from "@mui/material/styles";
import { contactData } from "../../Data/ContactData";
import { Box, Button } from "@mui/material";

const handlePrintClick = (cellValues: GridRenderCellParams) => {
  console.log(cellValues);
}

const datagridSx = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "primary.main",
    fontWeight: "bold",
    fontSize: 20
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      "&:nth-of-type(2n)": { backgroundColor: "grid.main" }
    }
  }
}

const columns = (theme: Theme) => ([
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
    headerName: "Role",
    minWidth: 100,
    renderCell: (cellValues: GridRenderCellParams<string>) => {
      return (cellValues.value)
    }
  },
  {
    field: "skills",
    headerName: "Skills",
    minWidth: 150,
    renderCell: (cellValues: GridRenderCellParams<string>) => {
      return (<div style={{ color: theme.palette.primary.main }}>{cellValues.value ? cellValues.value[0] : ""}</div>)
    }
  },
  {
    field: "startDate",
    headerName: "Start Date",
    minWidth: 120,
    renderCell: (cellValues: GridRenderCellParams<string>) => {
      return (cellValues.value)
    }
  },
  {
    field: "preference",
    headerName: "Work Preference",
    minWidth: 150,
    renderCell: (cellValues: GridRenderCellParams<string>) => {
      return (cellValues.value)
    }
  },
  {
    field: "Print",
    renderCell: (cellValues: GridRenderCellParams) => {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handlePrintClick(cellValues);
          }}
        >
          Print
        </Button>
      )
    }
  }
]);

export default function ContactDataGrid() {
  const rows = () => [...contactData];
  const theme = useTheme();
  return (
    <DataGrid
      autoHeight
      rows={rows()}
      columns={columns(theme)}
      pageSize={5}
      headerHeight={60}
      rowHeight={120}
      sx={datagridSx}
      components={
        {
          Toolbar: () => (<GridToolbarContainer sx={{ justifyContent: "flex-end", "& button": { border: "none" }, "& .MuiBox-root": { display: "none" } }}><GridToolbarExport /></GridToolbarContainer>)
        }
      }
      initialState={{
        sorting: { sortModel: [{ field: "name", sort: "asc" }] }
      }}
    />
  )
}