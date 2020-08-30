import React from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import axios from "axios";
import GoogleLogin from "react-google-login";

import "./style.css";
import InsightsLogo from "../../assets/img/InsightsLogo.svg";
import HMIFLogo from "../../assets/img/hmiflogo.png";

const WelcomePage: React.FC = () => {
  const history = useHistory();

  const googleClientId =
    process.env.GOOGLE_CLIENT_ID ||
    "41966004050-oh29iv7osdsmg8c9inn4q1kgagd0ga9k.apps.googleusercontent.com";
  const googleHostedDomain = process.env.GSUITE_DOMAIN || "std.stei.itb.ac.id";

  const fetchHmac = (idToken: string) => {
    axios.post("/.netlify/functions/macredirect", { idToken }).then((res) => {
      const { uid } = res.data;
      history.push('/insights/' + uid);
    });
  };

  const responseGoogle = (response: any) => {
    fetchHmac(response.tokenId);
  };

  return (
    <div className="root">
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
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
