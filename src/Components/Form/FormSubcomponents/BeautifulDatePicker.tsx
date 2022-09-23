import { TextField } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { minWidth } from "../ContactForm";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const popperSx = {
  "& .MuiPaper-root": {
    color: "yellow"
  },
  "& [role=grid]": {
    backgroundColor: "rgba(0,0,0,0.1)",
    "& button": {
      backgroundColor: "rgba(0,0,0,0.2)"
    }
  },
}

export default function (
  props: {
    onChange: (value: any, keyboardInputValue?: string | undefined) => void,
    value: string | undefined
  }
  ) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DesktopDatePicker
        {...props}
        label="Date"
        views={["day"]}
        inputFormat="MM/DD/YYYY"
        renderInput={(params) => {
          return <TextField {...params} sx={{ minWidth: minWidth }} />
        }}
        InputProps={{
          sx: {"& .MuiSvgIcon-root": {color: "primary.main"}}
        }}
        components={{
          OpenPickerIcon: CalendarTodayIcon
        }}
        PopperProps={{
          sx: popperSx
        }}
      />
    </LocalizationProvider>
  )
}