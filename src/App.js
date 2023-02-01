import React, { useContext, useEffect, useRef, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./scss/App.scss";
import Main from "./component/Main";
import Header from "./component/Header";
import List from "./component/List";
import Search from "./component/Search";
import Performancelist from "./component/Performancelist";
import Hidden from "./component/Hidden";
import { MyContext } from "./context/Context";

// hash를 써도 문제 browser를 써도 문제
// 로딩페이지를 만들어야하지않을까? 새로고침시 데이터 로드 시간이 조금 오래걸리는듯
// list <, > 만들어야할듯
// 로딩페이지 만들어야할듯
// all perform page infinite scroll

function App() {
  const { hiddenCheck } = useContext(MyContext);
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/list/:category/:page" element={<List />}></Route>
        <Route path="/performancelist" element={<Performancelist />}></Route>
        <Route path="/hidden" element={hiddenCheck ? <Hidden /> : <Main />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
