import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import { contactData } from "../../Data/ContactData";

const borderBottomColor = {
  borderBottomColor: "primary.main"
}

export default function ContactTable() {
  return (
    <TableContainer sx={{borderRadius: 1, boxShadow: 6, margin: 1, width: "calc(100% - 16px)"}}>
      <Table>
        <TableHead>
          <TableRow sx={{backgroundColor: "grid.main"}}>
            <TableCell sx={{...borderBottomColor, width: "30%"}}>
              Name
            </TableCell>
            <TableCell sx={{...borderBottomColor, width: "17%"}}>
              Role
            </TableCell>
            <TableCell sx={{...borderBottomColor, width: "17%"}}>
              Skills
            </TableCell>
            <TableCell sx={{...borderBottomColor, width: "17%"}}>
              Start Date
            </TableCell>
            <TableCell sx={{...borderBottomColor, width: "19%"}}>
              Work Preference
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactData.map((contact) => {
            return (
              <TableRow key={contact.name}>
                {
                  Object.entries(contact).map(([key, value]) => {
                    if (key === "skills") {
                      return (
                        <TableCell key={key} sx={borderBottomColor}>
                          {value.join(", ")}
                        </TableCell>
                      )
                    } else if (key === "name") {
                      return (
                        <TableCell 
                          key={key} 
                          sx={{backgroundColor: "primary.light", ...borderBottomColor}} 
                          onClick={
                            (event: React.MouseEvent<HTMLElement>) => {
                              console.log((event.target as Element).innerHTML);
                            }
                          }
                        >
                          {value}
                        </TableCell>
                      )
                    } else if (key !== "id") {
                      return (
                        <TableCell key={key} sx={borderBottomColor}>
                          {value}
                        </TableCell>
                      )
                    }
                    return ""
                  })
                }
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}