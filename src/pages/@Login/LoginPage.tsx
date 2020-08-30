import React, { useEffect } from "react";
import qs from "querystring";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";

const LoginPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const fetchHmac = (idToken: string) => {
    axios.post("/.netlify/functions/macredirect", { idToken }).then((res) => {
      const { uid } = res.data;
      history.replace("/insights/" + uid);
    });
  };

  const params = qs.decode(location.hash);

  useEffect(() => {
    fetchHmac(params.id_token as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
};

export default LoginPage;
