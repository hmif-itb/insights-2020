import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./style.css";

interface MyProps {
  backgroundImage?: any;
  backgroundColor?: any;
  backgroundOpacity?: number;
  topSubtitle?: any;
  mainText?: any;
  bodyText?: any;
  listItems?: any[];
}

const useStyles = makeStyles({
  background: {
    backgroundImage: (props: MyProps) => props.backgroundImage,
    backgroundColor: (props: MyProps) => props.backgroundColor,
    opacity: (props: MyProps) => props.backgroundOpacity,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 0,
  },
});

const CenteredTitleTextSlide: React.FC<MyProps> = (props) => {
  const classes = useStyles(props);
  return (
    <div className="Slide">
      <div className={classes.background}></div>
      <div className="content">
        <h1 className="main-text">{props.mainText}</h1>
      </div>
    </div>
  );
};

export default CenteredTitleTextSlide;
