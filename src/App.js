import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "./firebase";
import algoliasearch from "algoliasearch/lite";
import reading_glasses from './reading_glasses.png'
import {  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Highlight,
  Configure }
from "react-instantsearch-hooks-web";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
); // 환경 변수로 관리

function App() {
  const [text, setText] = useState("");
  const [foodGroup, setFoodGroup] = useState([]);
  const [foodData, setFoodData] = useState();

  const [data, setData] = useState([]);
  const [recipeData, setRecipeData] = useState([]);





  const Post = ({ hit }) => {
    return (
      <article>
        <h1>
          <Highlight attribute="title" hit={hit} />
        </h1>
        <p>
          <Highlight attribute="content" hit={hit} />
        </p>

      </article>
    );
  };




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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reference to the 'yourCollection' collection in Firestore
        const collectionRef = collection(db, "recipe");

        // Fetch documents from the collection
        const snapshot = await getDocs(collectionRef);

        // Extract data from the snapshot
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update the component state with the fetched data
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      <div className="m-10 bg-sky-100 relative">
        <p className="text-4xl mb-14 font-['Tenada']">ReFriFree</p>
        <div className="mx-96">
   




<div>
     
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
         
          </div>
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
            <img src={reading_glasses} alt="" className="w-8 h-full hover:cursor-pointer" 
             onClick={handleConfirm}></img>
            </div>
          </div>
        </div>
      </div>




    
        <button className="w-40 border-solid border-black bg-slate-300 h-12 mb-4 mt-4 m-auto block  rounded-md">
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
        <InstantSearch searchClient={searchClient} indexName="recipe">
        <SearchBox />
    
      <Hits hitComponent={Post} />
   

       
        </InstantSearch>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button
          className="border-solid border-black bg-slate-300"
          type="button"
          onClick={() => {
            axios
              .get(
                "http://openapi.foodsafetykorea.go.kr/api/72121c2cafd94dc49cce/COOKRCP01/json/1/10"
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
        <br></br>
        <br></br>
        
        <br></br>
        <div></div>
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
              <br></br>
        <br></br>
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
