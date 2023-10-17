import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { GiCrossMark } from "react-icons/gi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import DeleteModal from "../components/DeleteModal";

function MyFlashCard() {
  const [flashCardData, setFlashCardData] = useState(localStorage.getItem("flashcards")
    ? JSON.parse(localStorage.getItem("flashcards"))
    : []
  );

  const navigate = useNavigate();
  const [showCard, setShowCard] = useState(6);
  const handleViewCardsClick = (elem) => {
    navigate("/flashCardDetails", { state: elem });
  };

  const del = (delClickedItem) => {
    if (window.confirm("Are You Sure you want to delete This Flashcard !") === true) {
      let newData = [...flashCardData]
      newData = flashCardData.filter((elem) => {
        return elem !== delClickedItem;
      })
      setFlashCardData(newData);
      localStorage.setItem("flashcards", JSON.stringify(newData));
      toast.error(delClickedItem.groupName + " Flashcard Deleted ", { theme: "colored", icon: false, pauseOnFocusLoss: false })
    } else {
      console.log("Not Deleted.");
    }
  };
  return (
    <>
      <div className="myFlashcardDiv w-[78%] m-auto ">
        {/* <DeleteModal /> */}
        <ToastContainer />
        <div className="  text-right pr-10 text-sm absolute right-24   text-gray-500 font-bold ">Total FlashCards : {flashCardData.length}</div>
        <div className="displayFlashcardDiv " >
          {flashCardData.length !== 0 ? flashCardData.slice(0, showCard).map((elem, index) => (
            <div key={index} className="childCards ">
              <button className="del absolute text-gray-500 -right-3 -top-5 hidden  text-3xl hover:text-4xl hover:text-red-600 " onClick={() => del(elem, index)}><GiCrossMark /></button>
              <img className="border-2 bg-slate-400  w-16 h-16 m-auto rounded-full absolute -top-12 left-[39.3%] mb-10"
                src={elem.groupImage ? elem.groupImage : logo} />
              <h1 className="font-bold  mt-4 ">{elem.groupName}</h1>
              <h2 className="text-gray-700 h-10 mt-1">
                {elem.groupDescription.length > 60 ? elem.groupDescription.slice(0, 60) + "..." : elem.groupDescription} </h2>
              <h2 className="text-gray-500 font-bold mt-8">  {elem.term.length} Cards </h2>
              <button
                className="border-2 border-red-500 font-medium  m-auto text-red-600 w-40 h-8  rounded hover:bg-red-500 hover:text-white duration-300"
                onClick={() => handleViewCardsClick(elem)} >  View Cards
              </button>
            </div>
          ))
            : <>
              <div className="text-7xl text-red-800 mt-32"> "No data available"</div>
              <p className="text-xl mt-5">Please go and <i className="text-blue-500 underline hover:text-teal-600"><Link to="/createflashcard" >Create New FlashCard</Link></i></p>
            </>}

          {/* See all and See less Button if we have more than 6 FlashCard */}
          {flashCardData && flashCardData.length > 6 ? (
            <div className="w-[100%]">
              <div className="mt-5 text-right " >
                {flashCardData.length === showCard ?
                  (
                    <button onClick={() => { setShowCard(6); }}
                      className="mb-24 font-bold w-24 mx-5 text-red-700">
                      See less
                    </button>) : (
                    <button onClick={() => { setShowCard(flashCardData.length) }}
                      className="mb-24 font-bold w-24 mx-5 text-red-500 hover:text-red-700">
                      See all
                    </button>
                  )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default MyFlashCard;
