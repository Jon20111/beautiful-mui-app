import { useState } from "react";
import { Avatar, Box, Button, Card, Collapse, CardContent, CardHeader, Grid, List, ListSubheader, Typography } from "@mui/material";
import { contactData } from "../../Data/ContactData";

const contactLIHeight = 24;
let maxSkills = 1;

export default function ContactCardGrid() {
  const [open, setOpen] = useState(true);
  const gridAlignProps = open ? {} : {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  }
  return (
    <Box m={1}>
      <Button sx={{ marginBottom: 3 }} variant="contained" onClick={() => setOpen(!open)}>Collapse</Button>
      <Grid container spacing={2} sx={{ width: 700, backgroundColor: "grid.main", marginLeft: 0, paddingRight: 2, paddingBottom: 2 }}>
        {
          contactData.map((contact) => {
            maxSkills = (contact.skills?.length || 0) > maxSkills ? contact.skills?.length || 0 : maxSkills;
            return (
              <Grid item key={contact.name} xs={open ? 6 : 12} sx={{ ...gridAlignProps, minHeight: 300 }}>
                <Card sx={{ width: 300, boxShadow: 6 }}>
                  <CardHeader
                    title={contact.name}
                    subheader={contact.role}
                    sx={{ borderBottom: "1px solid", borderBottomColor: "primary.main" }}
                    avatar={
                      <Avatar sx={{ backgroundColor: "primary.main" }}>{contact.name?.substring(0, 1).toUpperCase() || "A"}</Avatar>
                    }
                  />
                  <Collapse
                    in={open}
                  //timeout={2000} 
                  //orientation="horizontal"
                  >
                    <CardContent sx={{ height: (104 + (maxSkills * contactLIHeight)) }}>
                      <Typography>
                        <b>Start Date: </b>{contact.startDate}
                      </Typography>
                      <Typography>
                        <b>Work Preference: </b>{contact.preference}
                      </Typography>
                      <List
                        sx={{ listStyle: "list-item", listStyleType: "circle", paddingLeft: 2 }}
                        subheader={
                          <ListSubheader
                            sx={{ right: 16, position: "inherit", fontSize: "1.25rem", color: "black", paddingLeft: 0 }}
                          >
                            Skills:
                          </ListSubheader>
                        }
                      >
                        {
                          contact.skills?.map((skill) => {
                            return <li style={{ paddingBottom: "2px" }}>{skill}</li>
                          })
                        }
                      </List>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
    </Box >
  )
}