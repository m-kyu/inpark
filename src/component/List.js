import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../context/Context";
import "../scss/List.scss";

const List = () => {
  const { setHiddenCheck, pageCount, orchestral, keyboard, chamber, vocal, stage } = useContext(MyContext);
  const { category, page } = useParams();

  useEffect(() => {
    setHiddenCheck(false);
  }, []);
  //  .slice((page - 1) * pageCount.current + 1, page * pageCount.current + 1)

  let cateArr = { Orchestral: orchestral, Keyboard: keyboard, Chamber: chamber, Vocal: vocal, Stage: stage };
  let [pageArr, setPageArr] = useState([]);

  useEffect(() => {
    let lastpage = Math.ceil(cateArr[category].length / pageCount.current);
    if (Number(page) < 3) {
      setPageArr([1, 2, 3, 4, 5]);
    } else if (Number(page) > lastpage - 2) {
      setPageArr([lastpage - 4, lastpage - 3, lastpage - 2, lastpage - 1, Number(lastpage)]);
    } else {
      setPageArr([page - 2, page - 1, Number(page), Number(page) + 1, Number(page) + 2]);
    }
  }, [category, page, orchestral, keyboard, chamber, vocal, stage]);

  const youtube = (obj) => {
    window.open(`https://www.youtube.com/results?search_query=${obj.name.replace(/ /g, "+") + "+" + obj.title.replace(/ /g, "+")}`);
  };

  return (
    <div className="list">
      <ul className="listUl">
        {cateArr[category].slice((page - 1) * pageCount.current + 1, page * pageCount.current + 1).map((obj, key) => {
          return (
            <li key={key} className="listLi">
              <p>{obj.name}</p>
              <p onClick={() => youtube(obj)}>
                <img src="./img/svg/youtube.svg" alt="" />
              </p>
              <p>{obj.title}</p>
            </li>
          );
        })}
      </ul>

      {/* 
        링크가 아니라 div 같은 일반 엘리먼트로 하고싶은데 params값을 직접 수정이 안되는 이유가 뭘까
        굳이 하려면 navigate같은거 사용하면 가능하긴 한듯
        이거 안되면 url에 직접 입력도 안되고 페이지 스킵(<, >)버튼도 꼬아서 만들어야할것같은데
        */}
      <div className="link-wrap">
        {pageArr.map((obj, key) => {
          return (
            <Link key={key} to={`/list/${category}/${obj}`}>
              {obj}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default List;
