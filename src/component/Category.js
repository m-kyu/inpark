import React from "react";
import "../scss/Category.scss";
import { Link } from "react-router-dom";

const Category = () => {
  return (
    <div className="category-wrap">
      <Link className="category" to="/list/Orchestral/1">
        <img src="./img/svg/orchestral.svg" alt="" />
        <p>Orchestral</p>
      </Link>
      <Link className="category" to="/list/Keyboard/1">
        <img src="./img/svg/keyboard.svg" alt="" />
        <p>Keyboard</p>
      </Link>
      <Link className="category" to="/list/Chamber/1">
        <img src="./img/svg/chamber.svg" alt="" />
        <p>Chamber</p>
      </Link>
      <Link className="category" to="/list/Vocal/1">
        <img src="./img/svg/vocal.svg" alt="" />
        <p>Vocal</p>
      </Link>
      <Link className="category" to="/list/Stage/1">
        <img src="./img/svg/stage.svg" alt="" />
        <p>Stage</p>
      </Link>
    </div>
  );
};

export default Category;
