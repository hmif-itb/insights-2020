import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";

import "./style.css";
import ClosingSlide from "../../slide/@Closing/ClosingSlide";
import { Slide, translateSlide } from "../../utils/slideTranslate";

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
    <div className="InsightsPage">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        open={showInstruction}
        onClose={() => setShowInstruction(false)}
        message="Geser kiri untuk melanjutkan"
      />
      {loading && (<div>Loading..</div>)}
      {!loading && (
        <SwipeableViews
          index={currentIndex}
          onChangeIndex={changeIndex}
          style={{ height: "100%" }}
          containerStyle={{ height: "100%" }}
        >
          {slides.map((slide) => translateSlide(slide))}
          <ClosingSlide onRepeatClick={() => setCurrentIndex(0)} />
        </SwipeableViews>
      )}
    </div>
  );
};

export default InsightsPage;
