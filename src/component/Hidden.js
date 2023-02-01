import React, { useContext, useEffect } from "react";
import { MyContext } from "../context/Context";
import "../scss/Hidden.scss";

const Hidden = () => {
  const { cData } = useContext(MyContext);
  let worldArr = [];
  let versersArr = [];
  let resultArr = [];

  const tournamentFunc = () => {
    for (let i = 0; i < worldArr.length / 2; i++) {
      //   console.log(worldArr[i * 2].name, worldArr[i * 2 + 1].name);
      versersArr[i] = { first: worldArr[i * 2], second: worldArr[i * 2 + 1] };
      //   console.log(i * 2, i * 2 + 1);
    }
    console.log(versersArr);
  };

  if (cData !== undefined) {
    for (let i = 0; i < 32; i++) {
      let ran = cData.composers[Math.floor(Math.random() * cData.composers.length)];

      if (worldArr.includes(ran)) {
        i--;
      } else {
        worldArr[i] = ran;
      }
    }

    return (
      <div className="hidden">
        <button onClick={tournamentFunc}>tournaStart</button>
      </div>
    );
  }
};

export default Hidden;
