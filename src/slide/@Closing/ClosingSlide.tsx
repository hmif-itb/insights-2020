import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import InsightsLogo from "../../assets/img/InsightsLogo.svg";
import HMIFLogo from "../../assets/img/hmiflogo.png";

const useStyles = makeStyles({
  Slide: {
    padding: "24px",
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: 'border-box'
  },
  content: {
    zIndex: 1,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  main_text: { margin: "0", textAlign: "center", fontWeight: 900 },
});

interface MyProps {
  onRepeatClick: { (): void };
}

const ClosingSlide: React.FC<MyProps> = ({ onRepeatClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.Slide}>
      <Box display="flex">
        <Box>
          <img src={InsightsLogo} height="20" />
        </Box>
        <Box flexGrow={1}>
          <img src={HMIFLogo} height="20" style={{ float: "right" }} />
        </Box>
      </Box>
      <div className={classes.content}>
        <h2 className={classes.main_text}>
          Setelah hampir satu tahun kita bersama, kami berharap pengalaman kamu
          di HMIF positif dan terkenang ya!
        </h2>
      </div>
      <Button variant="contained" size="large" color="primary" onClick={onRepeatClick}>
        Ulangi
      </Button>
    </div>
  );
};

export default ClosingSlide;
