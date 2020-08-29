import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import Snackbar from '@material-ui/core/Snackbar';

import ThreeLineTopSlide from "../../slide/@ThreeLineTop/ThreeLineTopSlide";
import "./style.css";
import TestBg from "../../assets/img/test/bg.jpg";
import TestCovid from "../../assets/img/test/covid.png";
import TestIITMoney from "../../assets/img/test/money.jpg";
import TestLutek from "../../assets/img/test/lutekbg.png";
import CenteredTitleTextSlide from "../../slide/@CenteredTitleText/CenteredTitleTextSlide";
import PersonQuotesSlide from "../../slide/@PersonQuotes/PersonQuotesSlide";
import ClosingSlide from "../../slide/@Closing/ClosingSlide";

const InsightsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInstruction, setShowInstruction] = useState(true);

  const changeIndex = (index: number) => {
      setCurrentIndex(index);
      setShowInstruction(false);
  }

  return (
    <div className="InsightsPage">
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={6000}
        open={showInstruction}
        onClose={() => setShowInstruction(false)}
        message="Geser kiri untuk melanjutkan"
      />
      <SwipeableViews
        index={currentIndex}
        onChangeIndex={changeIndex}
        style={{ height: "100%" }}
        containerStyle={{ height: "100%" }}
      >
        <ThreeLineTopSlide
          backgroundImage={`url('${TestBg}')`}
          backgroundOpacity={0.15}
          topSubtitle="Hello, Didit!"
          mainText={
            <>
              Kamu bergabung dengan HMIF pada tahun{" "}
              <span className="text-yellow">2018</span>.
            </>
          }
          bodyText={
            <>
              Setelah tiga bulan menghadapi teriakan Tio dan Ambar, akhirnya
              kamu dilantik menjadi angkatan <b>UNIX 2017</b>.
            </>
          }
        />
        <ThreeLineTopSlide
          backgroundImage={`url('${TestCovid}')`}
          backgroundColor="#2E0055"
          backgroundOpacity={0.15}
          topSubtitle="#HMIFFightsCorona"
          mainText={
            <>
              Virus <span className="text-yellow">corona</span> bukan halangan.
            </>
          }
          bodyText={
            <>
              Kita sudah Berhimpun From Home selama <b>92 hari</b> lho! Walaupun
              begitu, kita sudah melakukan <b>17 kegiatan</b> bersama-sama.
              Selain itu, kita juga sudah menyumbang <b>Rp5.432.000,-</b> untuk
              penanggulangan pandemi!
            </>
          }
        />
        <ThreeLineTopSlide
          backgroundImage={`url('${TestIITMoney}')`}
          backgroundColor="#502E00"
          backgroundOpacity={0.15}
          topSubtitle="#CuanProyekan"
          mainText={
            <>
              Kamu sudah menyelesaikan{" "}
              <span className="text-yellow">3 proyek</span> bersama IIT lho!
            </>
          }
          bodyText={
            <>
              Di kepengurusan ini, kamu sudah menyelesaikan <b>3 proyek</b>, dan
              dibayar <b>Rp5.630.000</b>! Bisa banget tuh buat traktiran :)
            </>
          }
        />
        <ThreeLineTopSlide
          backgroundColor="#460098"
          mainText={
            <>
              Selama di HMIF, kamu sudah memimpin{" "}
              <span className="text-yellow">3 divisi</span>, lho!
            </>
          }
          bodyText="Terima kasih atas jasa kamu memimpin divisi-divisi ini:"
          listItems={[
            "Divisi Tech Career and Issues",
            "Divisi IT Arkavidia 6.0",
            "Departemen Technology",
          ]}
        />
        <ThreeLineTopSlide
          backgroundColor="#008C98"
          mainText={
            <>
              Wow! Kamu telah menyumbangkan tenaga kamu ke{" "}
              <span className="text-yellow">5 tim</span>.
            </>
          }
          bodyText="Selama di HMIF, kamu tergabung ke dalam kepanitiaan/organisasi ini:"
          listItems={[
            "Divisi Tech Career and Issues",
            "Divisi IT Arkavidia 6.0",
            "Departemen Technology",
            "Divisi Syukuran Wisuda April 2019",
            "Panitia Dies Natalis HMIF 2019",
          ]}
        />
        <CenteredTitleTextSlide
          mainText="Berikut adalah pesan dari kadiv-kadiv kamu."
          backgroundColor="#008C98"
        />
        <PersonQuotesSlide
          quote="Lorem ipsum dolor sit amet! Lorem ipsum ipsum lorem."
          person={
            <>
              Luthfi Eko Trinowo,
              <br />
              Ketua HMIF Periode 2020/2021
            </>
          }
          backgroundColor="#008C98"
          ctaTitle="Lihat Rapor Anggota"
          ctaLink="https://hmif.itb.ac.id"
        />
        <PersonQuotesSlide
          quote="Lorem ipsum dolor sit amet! Lorem ipsum ipsum lorem."
          person={
            <>
              Nella Zabrina Primata,
              <br />
              Ketua Divisi IT Arkavidia 6.0
            </>
          }
          backgroundColor="#008C98"
          ctaTitle="Lihat Rapor Anggota"
          ctaLink="https://hmif.itb.ac.id"
        />
        <ThreeLineTopSlide
          backgroundImage={`url('${TestBg}')`}
          backgroundColor="#580014"
          backgroundOpacity={0.15}
          topSubtitle="#KangenKamu"
          mainText="Kami meminta kalian menuliskan kesan &amp; pesan untuk teman-teman kalian."
          bodyText="Sekarang, lihat apa yang teman-teman kamu tulis buat kamu."
        />
        <PersonQuotesSlide
          quote="Yak gua serahin kepada lu"
          person="Luthfi Eko Trinowo, UNIX 2017"
          backgroundColor="#580014"
          backgroundOpacity={0.15}
          backgroundImage={`url('${TestLutek}')`}
        />
        <ClosingSlide onRepeatClick={() => setCurrentIndex(0)} />
      </SwipeableViews>
    </div>
  );
};

export default InsightsPage;
