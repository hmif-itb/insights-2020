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
    height: '100%'
  },
  content: {
    marginTop: "36px",
    padding: "24px",
    zIndex: 1,
    flex: 1,
    justifyContent: "start",
  },
  top_subtitle: { fontWeight: 600 },
  main_text: { fontWeight: 900 },
  body_text: { marginTop: "64px", lineHeight: "150%" },
  list_items: { marginTop: "4px" },
  list_item: { fontWeight: "bold", marginTop: "4px", marginBottom: "8px" },
});

const ThreeLineTopSlide: React.FC<MyProps> = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.Slide}>
      <div className={classes.background}></div>
      <div className={classes.content}>
        <h3 className="top-subtitle">{props.topSubtitle}</h3>
        <h1 className="main-text">{props.mainText}</h1>
        <p className={classes.body_text}>{props.bodyText}</p>
        {props.listItems && (
          <div className={classes.list_items}>
            {props.listItems.map((item) => (
              <div className={classes.list_item}>{item}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeLineTopSlide;
