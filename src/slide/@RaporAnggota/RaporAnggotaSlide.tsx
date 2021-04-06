import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

interface MyProps {
  backgroundImage?: any;
  backgroundColor?: any;
  backgroundOpacity?: number;
  org: string;
  role: string;
  supervisor: string;
  scores: [{ criteria: string; score: string }];
  ctaTitle?: any;
  ctaLink?: string;
}

const useStyles = makeStyles((theme) => ({
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
  slide: {
    backgroundColor: (props: MyProps) => props.backgroundColor,
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "auto",
  },
  content: {
    paddingTop: "60px",
    padding: "24px",
    zIndex: 1,
    flex: 1,
    justifyContent: "start",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
  },
  slideTitle: {
    marginTop: theme.spacing(1),
  },
  sectionTitle: {
    fontSize: "12pt",
  },
  sectionBody: {
    fontSize: "16pt",
    marginTop: "4px",
    fontWeight: 600,
  },
  gridItem: {
    display: "flex",
  },
  card: {
    flex: 1,
    padding: theme.spacing(2),
    background: "#ffffff33",
    textAlign: "center",
  },
  score: {
    fontSize: "22pt",
    fontWeight: 600,
  },
  cta: { padding: "24px", display: "flex", flexDirection: "column" },
}));

const RaporAnggotaSlide: React.FC<MyProps> = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.slide}>
      <div className={classes.background}></div>
      <div className={classes.content}>
        <div>Rapor Anggota</div>
        <h1 className={classes.slideTitle}>
          <b>{props.org}</b>
        </h1>
        <Box mt={3}>
          <div className={classes.sectionTitle}>Posisi</div>
          <div className={classes.sectionBody}>{props.role}</div>
        </Box>
        <Box mt={3}>
          <div className={classes.sectionTitle}>Supervisor</div>
          <div className={classes.sectionBody}>{props.supervisor}</div>
        </Box>
        <Box mt={5}>
          <Grid container spacing={1}>
            {props.scores.map((item, i) => (
              <Grid item xs={6} key={i} className={classes.gridItem}>
                <Card elevation={0} className={classes.card}>
                  <div>{item.criteria}</div>
                  <Box mt={1} className={classes.score}>
                    {item.score}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
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

export default RaporAnggotaSlide;
