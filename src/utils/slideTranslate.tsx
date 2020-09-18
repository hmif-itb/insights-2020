import React from "react";
import ThreeLineSlide from "../slide/@ThreeLine/ThreeLineSlide";
import PersonQuotesSlide from "../slide/@PersonQuotes/PersonQuotesSlide";
import CenteredTitleTextSlide from "../slide/@CenteredTitleText/CenteredTitleTextSlide";

type BuilderFunction = { (params: { [key: string]: any }): React.ReactElement };
export interface Slide {
  id?: string;
  type: "threeLine" | "personQuotes" | "centeredTitleText";
  params: { [key: string]: any };
}

let builders: { [type: string]: BuilderFunction } = {};

function registerSlideType(type: string, builder: BuilderFunction) {
  builders[type] = builder;
}

export function translateSlide(slide: Slide) {
  const { type, params } = slide;
  const builderFunction = builders[type];
  return builderFunction ? builderFunction(params) : undefined;
}

registerSlideType("threeLine", (params) => {
  const {
    backgroundImage,
    backgroundColor,
    backgroundOpacity,
    topSubtitle,
    mainText,
    bodyText,
    listItems,
    bottom,
  } = params;

  return (
    <ThreeLineSlide
      backgroundImage={
        backgroundImage ? `url('${backgroundImage}')` : undefined
      }
      backgroundColor={backgroundColor}
      backgroundOpacity={backgroundOpacity}
      topSubtitle={topSubtitle}
      mainText={mainText}
      bodyText={bodyText}
      listItems={listItems}
      bottom={bottom}
    />
  );
});

registerSlideType("personQuotes", (params) => {
  const {
    backgroundImage,
    backgroundColor,
    backgroundOpacity,
    quote,
    person,
    ctaTitle,
    ctaLink,
  } = params;
  return (
    <PersonQuotesSlide
      backgroundImage={
        backgroundImage ? `url('${backgroundImage}')` : undefined
      }
      backgroundColor={backgroundColor}
      backgroundOpacity={backgroundOpacity}
      quote={quote}
      person={person}
      ctaTitle={ctaTitle}
      ctaLink={ctaLink}
    />
  );
});

registerSlideType("centeredTitleText", (params) => {
  const {
    backgroundImage,
    backgroundColor,
    backgroundOpacity,
    mainText,
  } = params;
  return (
    <CenteredTitleTextSlide
      backgroundImage={
        backgroundImage ? `url('${backgroundImage}')` : undefined
      }
      backgroundColor={backgroundColor}
      backgroundOpacity={backgroundOpacity}
      mainText={mainText}
    />
  );
});

/** Special panels */
registerSlideType("covid19", (params) => {
  const dateSinceBFH = dateDiff(new Date(2020, 3, 16), new Date())
  const noOfActivities = 17;
  const amountDonated = "Rp13.446.543,-";
  const bodyText = `Kita sudah Berhimpun From Home selama <b>${dateSinceBFH} hari</b> lho! Walaupun begitu, kita sudah melakukan <b>${noOfActivities} kegiatan</b> bersama-sama. Selain itu, kita juga sudah menyumbang <b>${amountDonated}</b> untuk penanggulangan pandemi!`;
  return (
    <ThreeLineSlide
      backgroundImage={`url('/img/covid.png')`}
      backgroundColor="#2E0055"
      backgroundOpacity={0.15}
      topSubtitle="#HMIFFightsCorona"
      mainText="Virus <span class='text-yellow'>corona</span> bukan halangan."
      bodyText={bodyText}
    />
  );
});

function dateDiff(startDate: Date, endDate: Date) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(
    Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
  );
}
