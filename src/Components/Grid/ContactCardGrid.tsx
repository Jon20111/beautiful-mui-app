import { useState } from "react"
import { Avatar, Box, Button, Collapse, Grid, Card, CardHeader, CardContent, Typography, List, ListSubheader } from "@mui/material";
import { contactData } from "../../Data/ContactData";

const contactLiHeight = 23;
let maxSkills = 1;

const gridAlignSize = {
  minWidth: 400,
  minHeight: 300
}

export default function ContactCardGrid() {
  const [open, setOpen] = useState(true);
  let gridAlignProps = open ? {} : {
    display: 'flex',
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }

  return (
    <Box m={1}>
      <Button sx={{ marginBottom: 3 }} variant="contained" onClick={() => { setOpen(!open) }}>Collapse</Button>
      <Grid container spacing={2} sx={{paddingRight: 2, paddingBottom: 2, marginLeft: 0, backgroundColor: 'grid.main', borderRadius: 2, width: 680}}>
        {contactData.map((contact) => {
          maxSkills = contact.skills.length > maxSkills ? contact.skills.length : maxSkills;
          return (
            <Grid item key={contact.name} xs={6} sx={open ? {}: gridAlignSize} {...gridAlignProps}>
              <Card sx={{ width: 300, boxShadow: 6 }}>
                <CardHeader
                  title={contact.name}
                  subheader={contact.role}
                  avatar={<Avatar sx={{backgroundColor: "primary.main"}}>{contact.name?.substring(0, 1).toUpperCase() || "A"}</Avatar>}
                  sx={{borderBottom: '1px solid', borderBottomColor: "primary.main"}}
                />
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <CardContent sx={{height: (104 + (maxSkills * contactLiHeight))}}>
                    <Typography>
                      <b>Start Date:</b> {contact.startDate}
                    </Typography>
                    <Typography>
                      <b>Work Preference:</b> {contact.preference}
                    </Typography>
                    <List
                      sx={{ listStyle: "list-item", listStyleType: "circle", paddingLeft: 2 }}
                      subheader={
                        <ListSubheader sx={{ right: 16, position: "inherit", fontSize: "1.25rem", color: "black", paddingLeft: 0 }}>
                          Skills:
                        </ListSubheader>
                      }
                    >
                      {contact.skills.map((skill) => {
                        return <li style={{ paddingTop: 0, paddingLeft: 0, paddingBottom: "2px" }} key={skill}>{skill}</li>
                      })}
                    </List>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}