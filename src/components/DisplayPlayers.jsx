import React from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function DisplayPlayers({ posts, removePost }) {
  if (posts.length === 0)
    return (
      <Box sx={{ marginTop: "2em" }}>
        <Typography variant="h5" align="center">
          You don't have any mp3 files uploaded here!
        </Typography>
        <Typography variant="subtitle2" align="center" sx={{ mt: 2 }}>
          Start uploading your mp3 files now.
        </Typography>
      </Box>
    );
  return (
    <Box sx={{ marginTop: "2em" }}>
      <Typography variant="h5" align="center">
        Your current mp3 files!
      </Typography>
      <Grid container direction="column" alignItems="center" spacing={3}>
        {posts.map((post) => (
          <Grid item key={post.id}>
            <Grid container direction="row" alignItems="flex-end" spacing={4}>
              <Grid item>
                <p>{post.title}</p>
                <audio controls>
                  <source src={post.selectedFile} type="audio/mpeg" />
                </audio>
              </Grid>
              <Grid item sx={{ marginBottom: 1 }}>
                <Button variant="outlined" onClick={() => removePost(post.id)}>
                  {<Delete />}Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
