import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";

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
    boxSizing: "border-box",
  },
  content: {
    zIndex: 1,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  main_text: { margin: "0", textAlign: "center", fontWeight: 900 },
  rating_container: {
    margin: "32px auto",
    width: "60%",
    textAlign: "center",
    "& > div": {
      marginTop: "8px",
    },
  },
});

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

interface MyProps {
  onRepeatClick: { (): void };
}

const ClosingSlide: React.FC<MyProps> = ({ onRepeatClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.Slide}>
      <Box display="flex">
        <Box>
          <img src={InsightsLogo} height="20" alt="Insights logo" />
        </Box>
        <Box flexGrow={1}>
          <img
            src={HMIFLogo}
            height="20"
            alt="HMIF logo"
            style={{ float: "right" }}
          />
        </Box>
      </Box>
      <div className={classes.content}>
        <h2 className={classes.main_text}>
          Setelah hampir satu tahun kita bersama, kami berharap pengalaman kamu
          di HMIF positif dan terkenang ya!
        </h2>
        <div>
          <div className={classes.rating_container}>
            <small>Seberapa suka kamu dengan HMIF Insights 2020?</small>
            <div>
              <StyledRating
                name="customized-color"
                defaultValue={0}
                getLabelText={(value: number) =>
                  `${value} Heart${value !== 1 ? "s" : ""}`
                }
                precision={1}
                icon={<FavoriteIcon fontSize="inherit" />}
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={onRepeatClick}
      >
        Ulangi
      </Button>
    </div>
  );
};

export default ClosingSlide;
