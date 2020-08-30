import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeftIcon from "@material-ui/icons/ChevronLeft";
import ArrowRightIcon from "@material-ui/icons/ChevronRight";
import axios from "axios";

import "./style.css";
import ClosingSlide from "../../slide/@Closing/ClosingSlide";
import { Slide, translateSlide } from "../../utils/slideTranslate";
import PageIndicator from "../../components/PageIndicator";
import { CircularProgress } from "@material-ui/core";

const InsightsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(false);
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);

  const changeIndex = (index: number) => {
    setCurrentIndex(index);
    setShowInstruction(false);
  };

  const fetchSlidesJson = () => {
    setLoading(true);
    axios
      .get("/test_data.json")
      .then((res) => {
        setShowInstruction(true);
        setSlides(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSlidesJson();
  }, []);

  return (
    <div className="root">
      <div className="control">
        <IconButton
          aria-label="back"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          <ArrowLeftIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="main">
        <div className="InsightsPage">
          <Snackbar
            className="instruction-snackbar"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={6000}
            open={showInstruction}
            onClose={() => setShowInstruction(false)}
            message="Geser kiri untuk melanjutkan"
          />
          {loading && (
            <div className="loading-page">
              <CircularProgress />
            </div>
          )}
          {!loading && (
            <>
              <div className="page-indicator-container">
                <PageIndicator total={slides.length + 1} index={currentIndex} />
              </div>
              <SwipeableViews
                index={currentIndex}
                onChangeIndex={changeIndex}
                style={{ height: "100%" }}
                containerStyle={{ height: "100%" }}
              >
                {slides.map((slide) => translateSlide(slide))}
                <ClosingSlide onRepeatClick={() => setCurrentIndex(0)} />
              </SwipeableViews>
            </>
          )}
        </div>
      </div>
      <div className="control">
        <IconButton
          aria-label="forward"
          disabled={currentIndex === slides.length}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          <ArrowRightIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default InsightsPage;
