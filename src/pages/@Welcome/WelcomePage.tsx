import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from'react-router-dom';

import "./style.css";
import InsightsLogo from "../../assets/img/InsightsLogo.svg";
import HMIFLogo from "../../assets/img/hmiflogo.png";

const WelcomePage: React.FC = () => {
  return (
    <div className="WelcomePage">
      <Box display="flex">
        <Box>
          <img src={InsightsLogo} height="20" alt="Insights logo" />
        </Box>
        <Box flexGrow={1}>
          <img src={HMIFLogo} height="20" alt="HMIF logo" style={{ float: "right" }} />
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
      <Button variant="contained" size="large" color="primary" component={RouterLink} to="/insights">
        Login ke Akun STD
      </Button>
    </div>
  );
};

export default WelcomePage;
