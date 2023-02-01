import React, { useContext, useEffect } from "react";
import "../scss/Main.scss";
import Performance from "../component/Performance";
import Category from "../component/Category";
import Recommend from "../component/Recommend";
import { MyContext } from "../context/Context";

const Main = () => {
  const { setHiddenCheck } = useContext(MyContext);
  useEffect(() => {
    setHiddenCheck(false);
  }, []);

  return (
    <main>
      <Performance />
      <Category />
      <Recommend />
    </main>
  );
};

export default Main;
