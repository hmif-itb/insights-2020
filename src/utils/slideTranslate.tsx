import React from "react";
import ThreeLineTopSlide from "../slide/@ThreeLineTop/ThreeLineTopSlide";
import PersonQuotesSlide from "../slide/@PersonQuotes/PersonQuotesSlide";
import CenteredTitleTextSlide from "../slide/@CenteredTitleText/CenteredTitleTextSlide";

type BuilderFunction = { (params: { [key: string]: any }): React.ReactElement };
export interface Slide {
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
  } = params;

  return (
    <ThreeLineTopSlide
      backgroundImage={
        backgroundImage ? `url('${backgroundImage}')` : undefined
      }
      backgroundColor={backgroundColor}
      backgroundOpacity={backgroundOpacity}
      topSubtitle={topSubtitle}
      mainText={mainText}
      bodyText={bodyText}
      listItems={listItems}
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
