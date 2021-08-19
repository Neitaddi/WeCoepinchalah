import React, { useState, useEffect } from "react";
import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";

const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        //pas de data
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUid(res.data);
        })
        .catch((err) => console.log("no token"));
    };
    fetchToken();
  }, [uid]);
  return (
    <div>
      <UidContext.Provider value={uid}>
        <Routes />
      </UidContext.Provider>
    </div>
  );
};
export default App;
