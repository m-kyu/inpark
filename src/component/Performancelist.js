import React, { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";
import "../scss/Performancelist.scss";

const Performancelist = () => {
  const { pOriginData, pOriginDataLength } = useContext(MyContext);
  const { setHiddenCheck } = useContext(MyContext);
  useEffect(() => {
    setHiddenCheck(false);
  }, []);

  // let currentPage = 1;
  // const dataPerPage = 5;
  // const lastPage = Math.ceil(pOriginDataLength / dataPerPage);
  // const addList = (currentPage) => {

  // };

  if (pOriginData !== undefined) {
    // console.log(pOriginData);
    return (
      <div className="perform-list">
        {pOriginData.map((obj, key) => {
          return (
            <article key={key}>
              <figure>
                <div className="img-wrap">
                  <img src={obj.IMGSRC} alt="" />
                </div>
                <figcaption>
                  <p className="cate1">{obj.GUBUN1}</p>
                  <p className="cate2">{obj.GUBUN2}</p>
                  <p className="title">{obj.TITLE_KOR}</p>
                  <p className="artist">{obj.ARTIST}</p>
                </figcaption>
              </figure>
            </article>
          );
        })}
      </div>
    );
  }
};

export default Performancelist;
