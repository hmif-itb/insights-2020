import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "2px",
    justifyContent: "stretch",
  },
  item: {
    background: "white",
    flex: 1,
    marginRight: "4px",
    borderRadius: "2px",
    "&:last-child": {
      marginRight: 0,
    },
    "&.active": {
      opacity: 1.0,
    },
    "&.passed": {
      opacity: 0.6,
    },
    "&.next": {
      opacity: 0.2,
    },
  },
});

interface MyProps {
  total: number;
  index: number;
}

const PageIndicator: React.FC<MyProps> = ({ total, index }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {Array(total)
        .fill(0)
        .map((_, i) => {
          const className =
            index === i ? "active" : i < index ? "passed" : "next";
          return <div className={`${classes.item} ${className}`} key={i} />;
        })}
    </div>
  );
};

export default PageIndicator;
