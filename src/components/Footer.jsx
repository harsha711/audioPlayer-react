import React from "react";
import { Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Fork © "}
      <Link
        color="inherit"
        href="https://github.com/harsha711/audioPlayer-react"
      >
        Github
      </Link>
    </Typography>
  );
}
