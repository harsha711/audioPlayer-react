import { Upgrade } from "@mui/icons-material";
import { Paper, TextField, Typography, Box, Grid, Button } from "@mui/material";
import Dexie from "dexie";
import React, { useState, useEffect } from "react";
import DisplayPlayers from "./DisplayPlayers";

export default function PlayerForm() {
  const db = new Dexie("ReactDexie");

  db.version(1).stores({
    posts: "++id, audioTitle, audioFile",
  });

  db.open().catch((err) => {
    console.log(err.stack || err);
  });

  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await db.posts.toArray();
      setPosts(response);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileUpload = (e) => {
    setSelectedFileName(e.target.files[0].name);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
    console.log(e.target.files[0]);
  };

  const handleRemovePost = async (id) => {
    db.posts.delete(id);
    fetchData();
  };

  const handleSubmit = async () => {
    console.log(title, selectedFile);
    if (title !== "" && selectedFile) {
      try {
        const id = await db.posts.add({
          title,
          selectedFile,
        });
        if (id) {
          fetchData();
        }
        setTitle("");
        setSelectedFile(null);
        setSelectedFileName("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Paper variant="outlined">
        <Box sx={{ my: 5 }}>
          <Typography variant="h4" align="center">
            Fill it up!
          </Typography>
        </Box>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <TextField
              variant="standard"
              label="Title of the Audio"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </Grid>
          <Grid item>
            <label htmlFor="contained-button-file">
              <input
                accept=".mp3,audio/*"
                id="contained-button-file"
                type="file"
                hidden
                onChange={handleFileUpload}
              />
              <Button variant="contained" component="span">
                <Upgrade />
              </Button>
            </label>
          </Grid>
          <Grid item>{selectedFileName}</Grid>
          <Grid item>
            <Button onClick={handleSubmit}>Upload</Button>
          </Grid>
        </Grid>
        {/* {selectedFile && (
          <audio controls>
            <source src={selectedFile} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        )} */}
      </Paper>
      {loading ? (
        <h3>Loading</h3>
      ) : (
        <DisplayPlayers posts={posts} removePost={handleRemovePost} />
      )}
    </div>
  );
}
