import React, { useState } from 'react';
import { Paper, Typography, Checkbox, Button } from "@material-ui/core";
import { post, del } from "../../libs/ajax";

export default ({ video }) => {
  if (!video) return <div>Loading...</div>;
  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`; 

  function like(){
    const newGoal=
        {
            name:video.snippet.title,
            video: videoSrc, 
            channel: video.snippet.channelTitle, 
            subscribe: video.snippet.description,
        }; 
    putGoalToState(newGoal)
  }

  function putGoalToState(goal) {
    post('/posts', { goal })  
}

  return (
    <React.Fragment>
      <Paper elevation={6} style={{ height: "30%" }}>
        <iframe
          frameBorder="0"
          height="100%"
          width="100%"
          title="Video Player"
          src={videoSrc}
        />
      </Paper>
      <Paper elevation={6} style={{ padding: "15px" }}>
        <Typography variant="h4">
          {video.snippet.title} - {video.snippet.channelTitle}
        </Typography>
        <Typography variant="subtitle1">
          {video.snippet.channelTitle}
        </Typography>
        <Typography variant="subtitle2"><Button onClick={like}>Добавить в свой список</Button></Typography>
        <Typography variant="subtitle3">{video.snippet.description}</Typography>
      </Paper>
    </React.Fragment>
  );
}
