import React from "react";
import Box from "@material-ui/core/Box";
import GoogleLogin from "react-google-login";
import { use100vh } from "react-div-100vh";

import "./style.css";
import InsightsLogo from "../../assets/img/InsightsLogo.svg";
import HMIFLogo from "../../assets/img/hmiflogo.png";

const WelcomePage: React.FC = () => {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";
  const googleHostedDomain = process.env.REACT_APP_GSUITE_DOMAIN;

  const location = window.location;
  const baseUrl = location.protocol + "//" + location.host;
  const redirectUrl = baseUrl + "/login";

  const height = use100vh();

  return (
    <div className="root" style={{ minHeight: height || "100vh" }}>
      <div className="main">
        <div className="WelcomePage">
          <Box display="flex">
            <Box>
              <img src={InsightsLogo} height="20" alt="Insights logo" />
            </Box>
            <Box flexGrow={1}>
              <img
                src={HMIFLogo}
                height="20"
                alt="HMIF logo"
                style={{ float: "right" }}
              />
            </Box>
          </Box>
          <div className="content">
            <div className="large-title">
              Selamat datang di akhir masa jabatan{" "}
              <span className="text-yellow">Lutek</span>.
            </div>
            <div className="subtitle">
              Ingat apa saja yang telah kita lakukan bersama?
            </div>
          </div>
          <GoogleLogin
            clientId={googleClientId}
            hostedDomain={googleHostedDomain}
            buttonText="Login to std.stei.itb.ac.id"
            uxMode="redirect"
            redirectUri={redirectUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
