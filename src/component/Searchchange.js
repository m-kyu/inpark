import React, { useContext } from "react";
import { MyContext } from "../context/Context";

const Searchchange = () => {
  const { searchChangeArr, setSearchChangeArr, cDispatch, cData, compName } = useContext(MyContext);
  const cPatch = (name) => {
    compName.current.value = "";
    cDispatch({ type: "search", name: name, data: cData });
    setSearchChangeArr([]);
  };
  if (searchChangeArr !== undefined) {
    return (
      <ul>
        {searchChangeArr.slice(0, 5).map((name, key) => {
          return (
            <li key={key} onClick={() => cPatch(name)}>
              {name}
            </li>
          );
        })}
      </ul>
    );
  }
};

export default Searchchange;
