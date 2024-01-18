import React, { useState, useEffect } from "react";
import "./index.css";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "./firebase";
import reading_glasses from "./reading_glasses.png";


function App() {
  const [text, setText] = useState("");
  const [foodGroup, setFoodGroup] = useState([]);

  const [recipeData, setRecipeData] = useState();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipeCollectionRef = collection(db, "recipe");
        const querySnapshot = await getDocs(recipeCollectionRef);

        const recipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          COOKRCP01: doc.data().COOKRCP01,
        }));

        setRecipeData(recipes);
       
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchRecipeData();
    
  }, []);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleConfirm = () => {
    let copyFoodGroup = [...foodGroup];
    copyFoodGroup.push(text);
    setFoodGroup(copyFoodGroup);
    setText("");
  };
  console.log(db.data);

  const filterHandler = () => {
    const filtered = recipeData[0].COOKRCP01.row.filter((value) =>
        value.RCP_PARTS_DTLS.includes(foodGroup[0])
      )
    setFilterData(filtered);
  
  };

  return (
    <>
      <div className="m-10 bg-sky-100 relative rounded-md">
        <p className="text-4xl m-14 font-['Tenada']">ReFriFree</p>
        <div className="mx-96">
          <div>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
                type="text"
                onChange={handleChange}
                value={text}
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="식재료를 입력하세요"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <div
                  id="currency"
                  name="currency"
                  className="h-full pt-1 pb-1 pr-7"
                >
                  <img
                    src={reading_glasses}
                    alt=""
                    className="w-8 h-full hover:cursor-pointer"
                    onClick={handleConfirm}
                  ></img>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-40 border-solid border-black bg-slate-300 h-12 mb-4 mt-4 m-auto block  rounded-md"
            onClick={filterHandler}
          >
            레시피 검색
          </button>

          {foodGroup.map((a, i) => {
            return (
              <ul>
                <li key={i}> • {foodGroup[i]}</li>
              </ul>
            );
          })}
        </div>

   
  
     
        <br></br>
        <br></br>
        <br></br>

        <div>
          <ul>
            {filterData ? filterData.map((row, index) => (
              <li key={row.id}>
                <ul>
                  {
                    <li key={index}>
                      <br></br>
                      <br></br>

                      <br></br>
                      <p>{row.RCP_NM}</p>
                      <br></br>
                      <p>식재료</p>

                      <p>{row.RCP_PARTS_DTLS}</p>
                      <p>조리 방법: {row.RCP_WAY2}</p>
                      <p>요리 종류: {row.RCP_PAT2}</p>
                      <p>칼로리: {row.INFO_ENG}kcal</p>
                      <p>탄수화물: {row.INFO_CAR}g</p>
                      <p>단백질: {row.INFO_PRO}g</p>
                      <p>지방: {row.INFO_FAT}g</p>
                      <p>나트륨: {row.INFO_NA}mg</p>
                      <br></br>
                      <br></br>
                      <br></br>
                      <p>만드는방법</p>
                      <br></br>
                      <p>{row.MANUAL01}</p>
                      <img src={row.MANUAL_IMG01} alt="" />
                      <p>{row.MANUAL02}</p>
                      <img src={row.MANUAL_IMG02} alt="" />
                      <p>{row.MANUAL03}</p>
                      <img src={row.MANUAL_IMG03} alt="" />
                      <p>{row.MANUAL04}</p>
                      <img src={row.MANUAL_IMG04} alt="" />
                      <p>{row.MANUAL05}</p>
                      <img src={row.MANUAL_IMG05} alt="" />
                      <p>{row.MANUAL06}</p>
                      <img src={row.MANUAL_IMG06} alt="" />
                      <p>{row.MANUAL07}</p>
                      <img src={row.MANUAL_IMG07} alt="" />
                      <p>{row.MANUAL08}</p>
                      <img src={row.MANUAL_IMG08} alt="" />
                      <p>{row.MANUAL09}</p>
                      <img src={row.MANUAL_IMG09} alt="" />
                      <p>{row.MANUAL10}</p>
                      <img src={row.MANUAL_IMG10} alt="" />
                      <p>{row.MANUAL11}</p>
                      <img src={row.MANUAL_IMG11} alt="" />

                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                    </li>
                  }
                </ul>
              </li>
            )) : <div>loading..</div>}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
