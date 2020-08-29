import React from "react";
import { makeStyles } from "@material-ui/core/styles";

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
  Slide: {
    backgroundColor: (props: MyProps) => props.backgroundColor,
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  content: {
    padding: "24px",
    zIndex: 1,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  main_text: { margin: "0", textAlign: "center" },
});

const CenteredTitleTextSlide: React.FC<MyProps> = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.Slide}>
      <div className={classes.background}></div>
      <div className={classes.content}>
        <h1 className={classes.main_text}>{props.mainText}</h1>
      </div>
    </div>
  );
};

export default CenteredTitleTextSlide;
