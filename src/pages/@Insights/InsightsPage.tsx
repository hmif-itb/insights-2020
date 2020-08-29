import React from "react";
import ThreeLineTopSlide from "../../slide/@ThreeLineTop/ThreeLineTopSlide";
import "./style.css";
import TestBg from "../../assets/img/test/bg.jpg";
import CenteredTitleTextSlide from "../../slide/@CenteredTitleText/CenteredTitleTextSlide";

const InsightsPage: React.FC = () => {
  return (
    <div className="InsightsPage">
      {/* <ThreeLineTopSlide
        backgroundImage={`url('${TestBg}')`}
        backgroundOpacity={0.15}
        topSubtitle="Hello, Didit!"
        mainText={<>Kamu bergabung dengan HMIF pada tahun <span className="text-yellow">2018</span>.</>}
        bodyText={<>Setelah tiga bulan menghadapi teriakan Tio dan Ambar, akhirnya kamu dilantik menjadi angkatan <b>UNIX 2017</b>.</>}
        listItems={["Divisi Tech Career and Issues", "Divisi IT Arkavidia 6.0"]}
      /> */}
      <CenteredTitleTextSlide mainText="Berikut adalah pesan dari kadiv-kadiv kamu." backgroundColor="#008C98" />
    </div>
  );
};

export default InsightsPage;
