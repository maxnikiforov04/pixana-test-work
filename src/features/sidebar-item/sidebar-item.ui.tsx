import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import * as React from "react";

export function SidebarItem({name}:{name: string}) {
    return(
        <ListItem disablePadding  sx={{fontSize:34, fontWeight:"medium"}}>
            <ListItemButton  sx={{fontSize:34, fontWeight:"medium"}}>
                <Box sx={{ fontSize:20,fontWeight: 'medium',textAlign:"center"}}>{name}</Box>
            </ListItemButton>
        </ListItem>
    )
}