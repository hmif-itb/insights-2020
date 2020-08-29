import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Button from "@material-ui/core/Button";

interface MyProps {
  backgroundImage?: any;
  backgroundColor?: any;
  backgroundOpacity?: number;
  quote?: any;
  person?: any;
  ctaTitle?: any;
  ctaLink?: string;
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
    marginTop: "48px",
    padding: "24px",
    zIndex: 1,
    flex: 1,
    justifyContent: "start",
  },
  main_text: { margin: "0" },
  icon_quote: {
    marginLeft: "-6px",
    transform: "rotate(180deg)",
    transformOrigin: "center",
  },
  body_text: { marginTop: "32px", lineHeight: "150%" },
  cta: { padding: "24px", display: "flex", flexDirection: "column" },
});

const PersonQuotesSlide: React.FC<MyProps> = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.Slide}>
      <div className={classes.background}></div>
      <div className={classes.content}>
        <FormatQuoteIcon className={classes.icon_quote} fontSize="large" />
        <h1 className={classes.main_text}>{props.quote}</h1>
        <p className={classes.body_text}>{props.person}</p>
      </div>
      {props.ctaTitle && (
        <div className={classes.cta}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => window.open(props.ctaLink, "_blank")}
          >
            {props.ctaTitle}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonQuotesSlide;
