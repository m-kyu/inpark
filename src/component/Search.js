import "../scss/Search.scss";
import React, { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";
import Complist from "./Complist";
import { useNavigate } from "react-router-dom";
import Searchchange from "./Searchchange";

const Search = () => {
  const { setSearchChangeArr, setHiddenCheck, cData, cDispatch, compName, hiddenCheck } = useContext(MyContext);
  const nav = useNavigate();
  let searchChangeArr = [];

  useEffect(() => {
    cDispatch({ type: "search", name: "", data: cData });
    setSearchChangeArr([]);
  }, []);

  // 한글검색 영어검색 분리해야하나?
  const searchChange = () => {
    searchChangeArr = [];
    if (compName.current.value != "") {
      cData.composers.map((obj) => {
        if (obj.name_eng.toLowerCase().includes(compName.current.value.toLowerCase()) || obj.name_kor.includes(compName.current.value)) {
          searchChangeArr.push(obj.name_eng);
        }
      });
      setSearchChangeArr(searchChangeArr);
    } else {
      setSearchChangeArr([]);
    }
  };

  const searchInput = (e) => {
    if (e.keyCode == 13) {
      if (compName.current.value.toLowerCase() === "world") {
        setHiddenCheck(true);
        nav("/hidden");
      }
      if (compName.current.value.length >= 3) {
        cDispatch({ type: "search", name: compName.current.value, data: cData });
      } else {
        alert("3글자 이상 입력해주세요.");
      }
      compName.current.value = "";
      setSearchChangeArr([]);
    }
  };
  const searchReset = () => {
    compName.current.value = "";
    setSearchChangeArr([]);
  };

  return (
    <div className="search">
      <div className="search-box">
        <input
          ref={compName}
          type="text"
          placeholder="작곡가 입력"
          style={{ background: "no-repeat left 1.26vh center / 3.78vh url(./img/svg/search.svg)" }}
          onKeyDown={(e) => searchInput(e)}
          onChange={() => searchChange()}
        ></input>
        <Searchchange />
        <button onClick={() => searchReset()}>
          <img src="./img/svg/cancel.svg" alt="" />
        </button>
      </div>
      <Complist />
    </div>
  );
};

export default Search;
