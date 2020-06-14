import React, { useState, Component } from "react";
import { Grid } from "@material-ui/core";
import Nav from "./nav";
import './search.module.css';
import { SearchBar, VideoList, VideoDetail } from "../components/SearchYoutubeComponents";

import youtube from "../api/youtube";

const Search = (props) => {

  async function handleSubmit(searchTerm) {
    const { data: { items: videos } } = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: 'AIzaSyDFz80Fxiho_by37y2OTLfhFk7JxRGvoWQ',
        q: searchTerm,
      }
    });

    setVideos(videos);
    setSelectedVideo(videos[0]);
  }

  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
  <div className = "search-page">
      <div className = "nav"> <Nav /></div>
    <div className = "search">
    <Grid style={{ justifyContent: "center" }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={selectedVideo}  tasks={props.tasks} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos} onVideoSelect={setSelectedVideo} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </div>
  </div>
  );
}


export default Search;
