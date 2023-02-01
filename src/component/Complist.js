import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { MyContext } from "../context/Context";
import "../scss/Complist.scss";
import "swiper/css/pagination";

const Complist = () => {
  const { cState } = useContext(MyContext);
  const [cModal, setCModal] = useState(false);
  const cObj = useRef();
  const ranObj = useRef([]);

  const compModal = (obj) => {
    ranObj.current = [];
    cObj.current = obj;
    if (obj.works.length > 3) {
      for (let i = 0; i < 3; i++) {
        let randomObj = obj.works[Math.floor(Math.random() * obj.works.length)];
        if (ranObj.current.includes(randomObj)) {
          i--;
        } else {
          ranObj.current[i] = randomObj;
        }
      }
    } else {
      ranObj.current = obj.works;
    }
    setCModal(true);
  };

  const youtube = (obj) => {
    window.open(`https://www.youtube.com/results?search_query=${obj.name.replace(/ /g, "+") + "+" + obj.title.replace(/ /g, "+")}`);
  };

  if (cState.length > 0) {
    return (
      <ul className="searchUl">
        <li className="searchLi">
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper swiper-wrap-comp"
          >
            {cState.map((obj, key) => {
              return (
                <SwiperSlide className="swiper-content-comp" key={key}>
                  <article onClick={() => compModal(obj)}>
                    <figure>
                      <div className="comp-img-wrap">
                        <img src={obj.img} alt="" />
                      </div>
                      <figcaption>
                        <p className="comp-name_eng">{obj.complete_name}</p>
                      </figcaption>
                    </figure>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </li>
        <div className={cModal ? "comp-modal on" : "comp-modal"}>
          <div className="comp-modal-content-wrap">
            <button onClick={() => setCModal(false)}>
              <img src="./img/svg/cancel.svg"></img>
            </button>
            <div className="comp-data">
              <div className="img">
                <img src={cObj.current && cObj.current.img} alt="" />
              </div>
              <div className="text">
                <p className="complete-name">{cObj.current && cObj.current.complete_name}</p>
                <p className="name_kor">{cObj.current && cObj.current.name_kor}</p>
                <p className="life">
                  {cObj.current && cObj.current.birth} ~ {cObj.current && cObj.current.death}
                </p>
                <p className="epoch">{cObj.current && cObj.current.epoch}</p>
              </div>
            </div>
            <div className="comp-recom">
              {ranObj.current &&
                ranObj.current.map((work, key) => {
                  return (
                    <div key={key} className="comp-recom-wrap">
                      <p className="name">{work.name}</p>
                      <p className="img" onClick={() => youtube(work)}>
                        <img src="./img/svg/youtube.svg" alt="" />
                      </p>
                      <p className="title">{work.title}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </ul>
    );
  } else {
    return <div className="error-msg">검색 결과가 없습니다.</div>;
  }
};

export default Complist;
