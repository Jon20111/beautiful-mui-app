import { useEffect, useRef, useState } from "react";
import { Select, SelectProps } from "@mui/material";
import { minWidth } from "../ContactForm";

//SelectProps is fussy
export default function (props: any) {
  const [position, setPosition] = useState(0);
  const selectInputComponent = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPosition(selectInputComponent.current ? (selectInputComponent.current.getBoundingClientRect().left + 20) : 0)
  }, []
  )
  return (
    <Select
    {...props}
    ref={selectInputComponent}
      id="skill-select"
      labelId="skill-select-label"
      sx={{ 
        minWidth: minWidth, 
        marginRight: { md: 2 },
        marginBottom: { xs: 2, md: 0 }
      }}
      multiple
      renderValue={(selected: string[]) => selected.join(", ")}
      MenuProps={{
        PaperProps: {
          sx: {
            left: `${position}px !important`,
            maxHeight: 180
          }
        }
      }}
    />
  )
}