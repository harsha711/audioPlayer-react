import React from "react";
import { AppBar, IconButton, Toolbar, Typography, Link } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Audio Player
        </Typography>
        <Link
          title="Github"
          component="a"
          target="_blank"
          href="https://github.com/harsha711/audioPlayer-react"
          color="inherit"
        >
          <IconButton color="inherit">
            <GitHub />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
