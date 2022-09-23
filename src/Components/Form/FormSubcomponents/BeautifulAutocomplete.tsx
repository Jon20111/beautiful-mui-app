import { Autocomplete, TextField } from "@mui/material";
import { minWidth } from "../ContactForm"

export default function (
  props: {
    onInputChange: (event: React.SyntheticEvent<Element, Event>, value: string | null) => void,
    value: string,
    options: string[]
  }
  ) {
  return (
    <Autocomplete
      {...props}
      sx={{ minWidth: minWidth }}
      isOptionEqualToValue={(option, value) => option === value || value === ""}
      getOptionLabel={(roleOption) => `${roleOption}`}
      renderInput={(params) => {
        return (
          <TextField
            name="role"
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused": {
                color: "primary.dark"
              }
            }}
            {...params}
          />
        )
      }}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            {`${option}`}
          </li>
        )
      }}
      ListboxProps={{
        //@ts-ignore
        sx: {
          height: 100,
          color: "primary.main"
        }
      }}
    />
  )
}