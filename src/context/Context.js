import React, { createContext, useLayoutEffect, useReducer, useRef, useState } from "react";
export const MyContext = createContext(null);
const cReducerFunc = (state, action) => {
  switch (action.type) {
    case "search":
      let searchArr = [];
      if (action.name === "") {
        //  검색값이 없을때 없다고떠야함
        return 0;
      }
      action.data.composers.forEach((comp) => {
        if (
          comp.name_eng.replace(/ /g, "").toLowerCase().includes(action.name.replace(/ /g, "").toLowerCase()) ||
          comp.name_kor.replace(/ /g, "").toLowerCase().includes(action.name.replace(/ /g, "").toLowerCase())
        ) {
          searchArr.push(comp);
        }
      });
      if (searchArr.length > 0) return searchArr;
      else return {};
    default:
      return 0;
  }
};

const Context = ({ children }) => {
  const lat = useRef();
  const lon = useRef();
  const url = useRef();
  const compName = useRef("");
  const [searchChangeArr, setSearchChangeArr] = useState([]);

  const [wData, setWData] = useState();
  const [cData, setCData] = useState();
  const [pOriginData, setPOriginData] = useState();
  const [pOriginDataLength, setpOriginDataLength] = useState();
  const [pData, setPData] = useState();
  const [cState, cDispatch] = useReducer(cReducerFunc, {});
  const pageCount = useRef(20);
  const [hiddenCheck, setHiddenCheck] = useState(false);

  const [orchestral, setOrchestral] = useState([]);
  const [keyboard, setKeyboard] = useState([]);
  const [chamber, setChamber] = useState([]);
  const [vocal, setVocal] = useState([]);
  const [stage, setStage] = useState([]);

  // 시작 (page - 1) * pageDataCount
  // 종료 page * pageDataCount

  useLayoutEffect(() => {
    // 위도 경도 받아서 날씨 api에 보낼 url작성
    function geoSet(data) {
      lat.current = data[0].lat;
      lon.current = data[0].lon;
      url.current = `https://api.openweathermap.org/data/2.5/weather?lat=${lat.current}&lon=${lon.current}&lang=kr&appid=21a21bc7c677bd8077d0597f15bcda0e`;
      getWeather();
    }
    // 위도 경도 구하는 api
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=seoul&limit=1&appid=21a21bc7c677bd8077d0597f15bcda0e")
      .then((res) => res.json())
      .then((geoData) => {
        geoSet(geoData);
      });
    // 날씨 구하는 api
    async function getWeather() {
      try {
        const data = await fetch(url.current);
        const weatherPromise = data.json();
        weatherPromise.then((weatherData) => {
          setWData(weatherData);
        });
      } catch {
        console.log("error");
      }
    }
    // 기초 정렬 구조 생각해야함 일단은 장르? 로
    // 1. Romantic
    // 2. Renaissance
    // 3. Post-War
    // 4. Medieval
    // 5. Late Romantic
    // 6. Early Romantic
    // 7. Classical
    // 8. Baroque
    // 9. 20th Century

    // 1. Orchestral 관현악 범위가 가장 넓음
    // 2. Keyboard 건반으로 연주되는 곡을 통칭
    // 3. Chamber 음향장치가 없는 순수악기로 연주되는 음악 가정집에서 연주된 역사
    // 4. Vocal 성악곡 관현악 반주인지 건반 반주인지는 중요하지않음
    // 5. Stage 무대에서 이루어지는 공연을 뜻함

    // 클래식 곡 데이터
    fetch("./json.json")
      .then((res) => {
        return res.json();
      })
      .then((classicData) => {
        setCData(classicData);
        {
          let orchestralResult = [];
          classicData.composers.forEach((comp, key) => {
            let compCopy = { ...comp };
            let workFilter = compCopy.works.filter((work) => work.genre === "Orchestral");
            if (workFilter.length) {
              compCopy.works = [];
              orchestralResult[key] = { ...compCopy, works: workFilter };
            }
          });
          let orchestralArr = [];
          orchestralResult.map((comp) => {
            comp.works.map((work) => {
              work.name = comp.complete_name;
              orchestralArr = [...orchestralArr, work];
            });
          });
          setOrchestral(orchestralArr);
          let keyboardResult = [];
          classicData.composers.forEach((comp, key) => {
            let compCopy = { ...comp };
            let workFilter = compCopy.works.filter((work) => work.genre === "Keyboard");
            if (workFilter.length) {
              compCopy.works = [];
              keyboardResult[key] = { ...compCopy, works: workFilter };
            }
          });
          let keyboardArr = [];
          keyboardResult.map((comp) => {
            comp.works.map((work) => {
              work.name = comp.complete_name;
              keyboardArr = [...keyboardArr, work];
            });
          });
          setKeyboard(keyboardArr);
          let chamberResult = [];
          classicData.composers.forEach((comp, key) => {
            let compCopy = { ...comp };
            let workFilter = compCopy.works.filter((work) => work.genre === "Chamber");
            if (workFilter.length) {
              compCopy.works = [];
              chamberResult[key] = { ...compCopy, works: workFilter };
            }
          });
          let chamberArr = [];
          chamberResult.map((comp) => {
            comp.works.map((work) => {
              work.name = comp.complete_name;
              chamberArr = [...chamberArr, work];
            });
          });
          setChamber(chamberArr);
          let vocalResult = [];
          classicData.composers.forEach((comp, key) => {
            let compCopy = { ...comp };
            let workFilter = compCopy.works.filter((work) => work.genre === "Vocal");
            if (workFilter.length) {
              compCopy.works = [];
              vocalResult[key] = { ...compCopy, works: workFilter };
            }
          });
          let vocalArr = [];
          vocalResult.map((comp) => {
            comp.works.map((work) => {
              work.name = comp.complete_name;
              vocalArr = [...vocalArr, work];
            });
          });
          setVocal(vocalArr);
          let stageResult = [];
          classicData.composers.forEach((comp, key) => {
            let compCopy = { ...comp };
            let workFilter = compCopy.works.filter((work) => work.genre === "Stage");
            if (workFilter.length) {
              compCopy.works = [];
              stageResult[key] = { ...compCopy, works: workFilter };
            }
          });
          let stageArr = [];
          stageResult.map((comp) => {
            comp.works.map((work) => {
              work.name = comp.complete_name;
              stageArr = [...stageArr, work];
            });
          });
          setStage(stageArr);
        }
      });
    // 공연 데이터
    fetch("http://openapi.seoul.go.kr:8088/647179694870616c313132656c46524c/json/SeoulPhilPblprfr/1/1000/")
      .then((res) => {
        return res.json();
      })
      .then((seoulData) => {
        let filterData = [];
        let date = new Date();
        // 지난 날짜 필터링
        filterData = seoulData.SeoulPhilPblprfr.row.filter((obj) => {
          let performDate = new Date(obj.PERFORM_DATE);
          if (performDate > date) {
            return obj;
          }
        });
        // 데이터 날짜순으로 정렬
        filterData.sort((a, b) => {
          if (a.PERFORM_DATE < b.PERFORM_DATE) return -1;
          if (a.PERFORM_DATE > b.PERFORM_DATE) return +1;
          return 0;
        });
        setPOriginData(filterData);
        setpOriginDataLength(filterData.length);
        if (filterData.length > 10) {
          setPData(filterData.slice(0, 10));
        } else {
          setPData(filterData);
        }
      });
  }, []);

  return (
    <MyContext.Provider
      value={{
        cData,
        pData,
        pOriginData,
        wData,
        setPData,
        cState,
        cDispatch,
        compName,
        pageCount,
        orchestral,
        keyboard,
        chamber,
        vocal,
        stage,
        hiddenCheck,
        setHiddenCheck,
        searchChangeArr,
        setSearchChangeArr,
        pOriginDataLength,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default Context;
