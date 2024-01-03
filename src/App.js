import React, { useState } from "react";
import "./index.css";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [foodGroup, setFoodGroup] = useState([]);
  const [foodData, setFoodData] = useState();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleConfirm = () => {
    let copyFoodGroup = [...foodGroup];
    copyFoodGroup.push(text);
    setFoodGroup(copyFoodGroup);
    setText("");
  };

  return (
    <>
      <div className="m-60">
        <input
          className="border-solid border-black"
          placeholder="식재료를 입력하세요"
          onChange={handleChange}
          value={text}
        />

        {foodGroup.map((a, i) => {
          return (
            <ul>
              <li key={i}>{foodGroup[i]}</li>
            </ul>
          );
        })}

        <br></br>
        <button
          className="border-solid border-black bg-slate-300"
          type="button"
          onClick={handleConfirm}
        >
          등록
        </button>
        <br></br>
        <button
          className="border-solid border-black bg-slate-300"
          type="button"
          onClick={() => {
            axios
              .get(
                "http://openapi.foodsafetykorea.go.kr/api/72121c2cafd94dc49cce/COOKRCP01/json/1/94"
              )
              .then((결과) => {
                setFoodData(결과.data);
                console.log(결과.data);
              })
              .catch(() => {
                console.log("실패함");
              });
          }}
        >
          오픈api출력
        </button>
        <br></br>
        <br></br>
        <br></br>

        { foodData ? foodData.COOKRCP01.row.map((recipe, index) => (
          <div key={index}>
            <h3>음식명 : {recipe.RCP_NM}</h3>
            <p>식재료 : {recipe.RCP_PARTS_DTLS}</p>

            <p>조리 방법: {recipe.RCP_WAY2}</p>
            <p>칼로리: {recipe.INFO_ENG}</p>

            <img src={recipe.MANUAL_IMG01} alt={`레시피 이미지 ${index}`} />
          </div>
        )) :  <p>Loading...</p>
}

      </div>
    </>
  );
}

export default App;
