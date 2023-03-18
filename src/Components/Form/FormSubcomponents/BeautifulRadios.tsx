import { FormControlLabel, FormControl, FormGroup, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material";
import { defaultPreference, minWidth } from "../ContactForm"

export default function BeautifulRadios(props: { preference: string | undefined, handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void }) {
  return (
    <FormControl disabled>
      <FormGroup
        sx={{
          minWidth: minWidth,
          marginRight: { md: 2 },
          marginBottom: { xs: 2, md: 0 }
        }}>
        <FormLabel component="legend" htmlFor="preference-type-radio">
          Work Preference
        </FormLabel>
        <RadioGroup
          aria-label="preference"
          id="preference-type-radio"
          name="preference"
          value={props.preference}
          onChange={props.handleRadioChange}
        >
          <FormControlLabel
            label={defaultPreference}
            value={defaultPreference}
            control={<Radio />}
          />
          <FormControlLabel
            label="Hybrid"
            value="Hyrbid"
            control={<Radio />}
          />
          <FormControlLabel
            label="In Office"
            value="In Office"
            control={<Radio />}
          />
        </RadioGroup>
        <FormHelperText>WFH!</FormHelperText>
      </FormGroup>
    </FormControl>
  )
}