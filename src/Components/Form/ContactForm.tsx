import { useState } from "react";
import { Alert, AlertTitle, Button, Checkbox, Dialog, FormControl, FormGroup, ListItemText, MenuItem, Paper, SelectChangeEvent, Stack } from "@mui/material";
import { contactData, FormValues } from "../../Data/ContactData";
import BeautifulTextField from "./FormSubcomponents/BeautifulTextField";
import BeautifulAutocomplete from "./FormSubcomponents/BeautifulAutocomplete";
import BeautifulSelect from "./FormSubcomponents/BeautifulSelect";
import BeautifulDesktopDatePicker from "./FormSubcomponents/BeautifulDatePicker";
import BeautifulRadios from "./FormSubcomponents/BeautifulRadios";
import { StyledFormGroup } from "./FormSubcomponents/StyledFormGroup";

const roles = ["Software Dev", "Architect", "Designer", "Business Analyst"];
const skills = ["React", "Angular", "Python", "NodeJS", "Machine Learning"];
export const defaultRadioValue = "Work From Home";
export const minWidth = 300;

const paperInputsStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid",
      borderColor: "primary.main"
    },
  },
  "& .MuiOutlinedInput-root:hover": {
    "& fieldset": {
      borderColor: "primary.light"
    }
  },
  "& .MuiFormLabel-root": {
    color: "primary.dark"
  }
}

export default function ContactForm() {
  const today = new Date();
  const getDefaultFormValues = () => {
    return { id: contactData.length + 1, role: '', name: '', skills: [], startDate: `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`, preference: defaultRadioValue }
  }

  const [formValues, setFormValues] = useState<FormValues>(
    getDefaultFormValues()
  );
  const [alertOpen, setAlertOpen] = useState(false)

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleAutoCompleteChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setFormValues({
      ...formValues,
      role: value || ""
    })
  }

  const handleSelectChange = (event: SelectChangeEvent<string[]>, child: React.ReactNode) => {
    const {
      target: { value }
    } = event;
    setFormValues({
      ...formValues,
      skills: typeof value === "string" ? value.split(", ") : value
    })
  }

  const handleDatePickerChange = (
    value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | null,
    keyboardInputValue?: string | undefined
  ) => {
    const startDate = value as unknown as { month: () => string, date: () => string; year: () => string; };
    setFormValues({
      ...formValues,
      startDate: `${startDate.month() + 1}/${startDate.date()}/${startDate.year()}`
    })
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    const { name } = event.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleSubmit = () => {
    contactData.push(formValues);
    clearValues();
    setAlertOpen(true);
  }

  const handleClear = () => {
    clearValues();
  }

  const clearValues = () => {
    setFormValues(getDefaultFormValues());
  }

  return (
    <>
      <Paper
        sx={{
          ...paperInputsStyle,
          margin: 1,
          backgroundColor: "grid.main"
        }}
      >
        <form>
          <FormControl>
            <StyledFormGroup
              paddingtop={20}
              row
            >
              <BeautifulTextField
                onChange={handleTextFieldChange}
                value={formValues.name}
              />
              <BeautifulAutocomplete
                onInputChange={handleAutoCompleteChange}
                value={formValues.role || ""}
                options={roles}
              />
            </StyledFormGroup>
            <StyledFormGroup
              row
            >
              <BeautifulSelect
                onChange={handleSelectChange}
                value={formValues.skills || ""}
              >
                {skills.map((skillName) => {
                  return (
                    <MenuItem value={skillName} key={skillName}>
                      <Checkbox checked={formValues.skills.includes(skillName)} />
                      <ListItemText primary={skillName} />
                    </MenuItem>
                  )
                })}
              </BeautifulSelect>
              <BeautifulDesktopDatePicker
                onChange={handleDatePickerChange}
                value={formValues.startDate}
              />
            </StyledFormGroup>
            <StyledFormGroup
              row
            >
              <BeautifulRadios preference={formValues.preference} handleRadioChange={handleRadioChange} />
              <Stack justifyContent="space-around" alignItems="center" sx={{minWidth: minWidth}}>
                <Button variant="contained" sx={{ height: 56, width: 100 }} onClick={handleSubmit}>Save</Button>
                <Button variant="beautiful" sx={{ height: 56, width: 100 }} onClick={handleClear}>Clear</Button>
              </Stack>
            </StyledFormGroup>
          </FormControl>
        </form>
      </Paper>
      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)}>
          <AlertTitle>Success!</AlertTitle>
          Form Submitted
        </Alert>
      </Dialog>
    </>
  )
}