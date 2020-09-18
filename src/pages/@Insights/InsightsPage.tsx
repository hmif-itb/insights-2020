import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import ArrowLeftIcon from "@material-ui/icons/ChevronLeft";
import ArrowRightIcon from "@material-ui/icons/ChevronRight";
import axios from "axios";
import { uuid } from "uuidv4";

import "./style.css";
import ClosingSlide from "../../slide/@Closing/ClosingSlide";
import { Slide, translateSlide } from "../../utils/slideTranslate";
import PageIndicator from "../../components/PageIndicator";
import { CircularProgress } from "@material-ui/core";

const InsightsPage: React.FC = () => {
  const params = useParams<{ uid: string }>();
  const [sessionId] = useState<string>(uuid());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [slides, setSlides] = useState<Slide[]>([]);

  const changeIndex = (index: number) => {
    setCurrentIndex(index);
    setShowInstruction(false);
  };

  const fetchSlidesJson = () => {
    const fetchBaseUrl = process.env.REACT_APP_STORIES_BASE_URL;
    setLoading(true);
    axios
      .get(`${fetchBaseUrl}/${params.uid}.json`)
      .then((res) => {
        setShowInstruction(true);
        setSlides(res.data);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          setError("Kami gak punya Insights untukmu :(");
        } else {
          setError("Hmm terjadi kesalahan yang gak diduga");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const recordEvent = (type: string, data?: { [key: string]: any }) => {
    const body = {
      target: params.uid,
      sessionId,
      type,
      time: Math.round(new Date().getTime() / 1000),
      data,
    };

    axios.post("/.netlify/functions/event", body).catch((e) => {
      console.log("Event recording failed", e);
    });
  };

  useEffect(() => {
    fetchSlidesJson();
    recordEvent("init");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!slides) return;

    const slide = slides[currentIndex];
    const id = slide.id || "idx:" + currentIndex;

    recordEvent("slide", { id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

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
          {!loading && error && (
            <div className="error-page">
              <h2>{error}</h2>
              <Button variant="outlined" component={RouterLink} to="/">
                Kembali ke Laman Utama
              </Button>
            </div>
          )}
          {!loading && !error && (
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
