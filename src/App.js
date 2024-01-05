import React, { useState, useEffect } from "react";
import "./index.css";
import { collection, getDocs } from 'firebase/firestore/lite';
import db from "./firebase";

function App() {
  const [text, setText] = useState("");
  const [foodGroup, setFoodGroup] = useState([]);
  const [foodData, setFoodData] = useState();


  const [data, setData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipeCollectionRef = collection(db, 'recipe');
        const querySnapshot = await getDocs(recipeCollectionRef);

        const recipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          COOKRCP01: doc.data().COOKRCP01,
        }));

        setRecipeData(recipes);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchRecipeData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to the 'yourCollection' collection in Firestore
        const collectionRef = collection(db, 'recipe');

        // Fetch documents from the collection
        const snapshot = await getDocs(collectionRef);

        // Extract data from the snapshot
        const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Update the component state with the fetched data
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
     
        <br></br>
        <br></br>
        <div>
      <h1>Recipe Component</h1>
      <ul>
        {recipeData.map((recipe) => (
          <li key={recipe.id}>
            <h2>Recipe ID: {recipe.id}</h2>
            <ul>
              {recipe.COOKRCP01.row.map((row, index) => (
                <li key={index}>
                  Hash Tag: {row.RCP_NM}, {row.RCP_PARTS_DTLS}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
        <br></br>
        <div>
      
    </div>
        <br></br>
        <br></br>
        <br></br>

        {foodData ? (
          foodData.COOKRCP01.row.map((recipe, index) => (
            <div key={index}>
              {index}
              <h3>음식명 : {recipe.RCP_NM}</h3>
              <p>식재료 :{recipe.RCP_PARTS_DTLS}</p>

              <p>조리 방법: {recipe.RCP_WAY2}</p>
              <p>요리 종류: {recipe.RCP_PAT2}</p>
              <p>칼로리: {recipe.INFO_ENG}</p>
              <p>탄수화물: {recipe.INFO_CAR}</p>
              <p>단백질: {recipe.INFO_PRO}</p>
              <p>지방: {recipe.INFO_FAT}</p>
              <p>나트륨: {recipe.INFO_NA}</p>

              <img src={recipe.MANUAL_IMG01} alt="" />
              <p>만드는방법</p>
              <p>{recipe.MANUAL01}</p>
              <img src={recipe.MANUAL_IMG01} alt="" />
              <p>{recipe.MANUAL02}</p>
              <img src={recipe.MANUAL_IMG02} alt="" />
              <p>{recipe.MANUAL03}</p>
              <img src={recipe.MANUAL_IMG03} alt="" />
              <p>{recipe.MANUAL04}</p>
              <img src={recipe.MANUAL_IMG04} alt="" />
              <p>{recipe.MANUAL05}</p>
              <img src={recipe.MANUAL_IMG05} alt="" />
              <p>{recipe.MANUAL06}</p>
              <img src={recipe.MANUAL_IMG06} alt="" />
              <p>{recipe.MANUAL07}</p>
              <img src={recipe.MANUAL_IMG07} alt="" />
              <p>{recipe.MANUAL08}</p>
              <img src={recipe.MANUAL_IMG08} alt="" />
              <p>{recipe.MANUAL09}</p>
              <img src={recipe.MANUAL_IMG09} alt="" />
              <p>{recipe.MANUAL10}</p>
              <img src={recipe.MANUAL_IMG10} alt="" />
              <p>{recipe.MANUAL11}</p>
              <img src={recipe.MANUAL_IMG11} alt="" />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default App;
