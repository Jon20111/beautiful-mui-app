import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

//@ts-ignore
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Stack sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Stack>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

export default function CustomTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack sx={{ width: "max-content" }}>
      <Stack sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            title: 'my ttip',
            sx: { backgroundColor: 'red', height: 4 }
          }}
          sx={{
            "& button": { borderRadius: 2 },
            "& button:hover": { backgroundColor: 'blue' },
            "& button:active": { backgroundColor: 'gold' },
            "& button.Mui-selected": { backgroundColor: 'green' }
          }}
        >
          <Tab label="Tab One" />
          <Tab label="Tab Two" />
          <Tab label="Tab Three" />
        </Tabs>
      </Stack>
      <TabPanel value={value} index={0}>
        Tab One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Tab Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Tab Three
      </TabPanel>
    </Stack>
  );
}
