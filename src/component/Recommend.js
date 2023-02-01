import React, { useContext, useRef, useState } from "react";
import "../scss/Recommend.scss";
import { MyContext } from "../context/Context";

const Recommend = () => {
  const { wData, cData } = useContext(MyContext);
  const [recomPop, setRecomPop] = useState(false);
  const recomComposersRandom = useRef();
  const recomWorksRandom = useRef();
  const recommendYoutubeURL = useRef();

  // 이경우에 List 출력과는 달리 modal창으로 팝업. 내용은 작곡가, 곡명, 유튜브링크 정도?
  // 원래는 추천은 날씨에 따라 형식, 장르등을 찾아서 추천해줘야하지만 문외한이라 한계가 있을듯
  const recommendFunc = () => {
    recomComposersRandom.current = cData.composers[Math.ceil(Math.random() * cData.composers.length)];
    recomWorksRandom.current = recomComposersRandom.current.works[Math.ceil(Math.random() * recomComposersRandom.current.works.length)];
    recommendYoutubeURL.current = `https://www.youtube.com/results?search_query=${
      recomComposersRandom.current.name.replace(/ /g, "+") + "+" + recomWorksRandom.current.title.replace(/ /g, "+")
    }`;
    setRecomPop(true);
  };
  const modalOff = () => {
    setRecomPop(false);
  };
  if (wData !== undefined) {
    return (
      <div className="recommend-container">
        <div className="recommend-wrap" onClick={recommendFunc}>
          <div className="span-wrap">
            <span className="weather">
              날씨 : {wData.weather[0].description}
              <img src={`http://openweathermap.org/img/w/${wData.weather[0].icon}.png`} alt="" />
            </span>
            <span className="temp">기온 : {Math.round(wData.main.temp - 273.15)}°C</span>
            <span className="humidity">습도 : {wData.main.humidity}%</span>
          </div>
          <p> 오늘의 추천 곡 'click'</p>
        </div>
        <div className={recomPop ? "modal on" : "modal"} onClick={modalOff}>
          <article>
            <p>
              <img src={`http://openweathermap.org/img/w/${wData.weather[0].icon}.png`} alt="" />
              날씨에 듣기 좋은
            </p>
            <figure>
              <img src={recomComposersRandom.current && recomComposersRandom.current.img} alt="" />
              <figcaption>
                <p>{recomComposersRandom.current && recomComposersRandom.current.name}</p>
                <p>{recomWorksRandom.current && recomWorksRandom.current.title}</p>
                <div className="youtubeBtn">
                  <div className="img-wrap" onClick={() => window.open(recommendYoutubeURL.current, "_blank")}>
                    <img src="./img/svg/youtube.svg" alt="" />
                  </div>
                </div>
              </figcaption>
            </figure>
          </article>
        </div>
      </div>
    );
  }
};

export default Recommend;
