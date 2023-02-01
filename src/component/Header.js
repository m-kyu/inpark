import React, { useContext, useState } from "react";
import "../scss/Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../context/Context";

// 서치메뉴, 버거메뉴 작업해야함
// 검색바 디자인 수정해야함 클릭 겹치는부분 생겨서 이상함

const Header = () => {
  const navi = useNavigate();
  const [burgerOn, setBurgerOn] = useState(false);
  const { cDispatch, cData } = useContext(MyContext);

  const burgerClickFunc = (e) => {
    if (e.target.className === "burger-wrap" || e.target.className === "burger-span") {
      setBurgerOn(!burgerOn);
    }
  };
  const locoClickFunc = () => {
    setBurgerOn(false);
    navi("/");
  };
  const searchBtnFunc = (e) => {
    // cDispatch({ type: "search", data: cData, name: "" });
    // 다른페이지 갔다가 서치페이지 이동하면 결과 없어야함
    setBurgerOn(false);
    navi("/search");
  };
  return (
    <header>
      <div className={burgerOn ? "burger on" : "burger"} onClick={(e) => burgerClickFunc(e)}>
        <div className="burger-wrap">
          <span className="burger-span"></span>
          <span className="burger-span"></span>
          <span className="burger-span"></span>
        </div>
        <div className="burger-open">
          <Link to="/" onClick={() => setBurgerOn(false)}>
            HOME
          </Link>
          <Link to="/performancelist" onClick={() => setBurgerOn(false)}>
            PERFORM
          </Link>
          <Link
            to="/search"
            onClick={() => {
              setBurgerOn(false);
            }}
          >
            SEARCH
          </Link>
        </div>
      </div>
      <div to="/" className="logo" onClick={() => locoClickFunc()}>
        <img src="./img/svg/logo.svg" alt="" />
      </div>
      <div className="search-icon" onClick={(e) => searchBtnFunc(e)}>
        <img className="search-icon-img" src="./img/svg/search.svg" alt="" />
        {/* <div className={searchOn ? "search-box on" : "search-box"}>
          <input ref={compName} type="text" placeholder="작곡가 이름 입력"></input>
          <button type="submit" onClick={search}>
            검색
          </button>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
