import React from "react";
import { Typography, AppBar } from "@material-ui/core";

// components
import VideoPlayer from "Components/VideoPlayer";
import Options from "Components/Options";
import Notification from "Components/Notification";

// hooks
import { useStyles } from "Hooks/useStyles";

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">
          Video Chat App
        </Typography>
      </AppBar>

      <VideoPlayer />
      <Options>
        <Notification />
      </Options>
    </div>
  );
};

export default App;
