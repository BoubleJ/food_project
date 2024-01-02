import React, { useState } from "react";
import "./index.css";
import axios from "axios";


function App() {
  const [text, setText] = useState("");
  const [foodGroup, setFoodGroup] = useState([]);
  const [foodData, setFoodData] = useState()

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
                "http://openapi.foodsafetykorea.go.kr/api/sample/COOKRCP01/json/5/5"
              )
              .then((결과) => {
                setFoodData(결과.data)
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
 
      </div>
    </>
  );
}

export default App;
