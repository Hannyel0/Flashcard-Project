import React, { useState, useEffect} from 'react'
import "./app.css"
import FlashCardList from './FlashCardList'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'




export default function App() {

  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)

  useEffect(()=>{
    axios
    .get('https://opentdb.com/api.php?amount=15&category=18&difficulty=easy')
    .then(res =>{
      const formattedFlashcards = res.data.results.map( questionItem =>{

        const answer = decodeString(questionItem.correct_answer) 
        const options = [...questionItem.incorrect_answers.map(option => decodeString(option)), answer]
        return{
          id: uuidv4(),
          question: decodeString(questionItem.question),
          answer: answer,
          options: options.sort(()=> Math.random() - .5)
        }
        
      })
      setFlashcards(formattedFlashcards)
    })
    

    
  },[])

  function decodeString (string){
    const textArea = document.createElement('textarea')
    textArea.innerHTML = string
    return textArea.value

  }
  



  return(
    <div className="container">
      <FlashCardList flashcards = {flashcards}/>
    </div>
    
  )

  

  
}




const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "How much is 2 + 2?",
    answer: 4,
    options: [
      2,
      3,
      4,
      5
    ]

  },
  {
    id: 2,
    question: "Whats the real answer?",
    answer: "answer 2",
    options: [
      "answer",
      "answer 2",
      "answer 3",
      "answer 4"
    ]

  },

  {
    id: 3,
    question: "What anime has more chapters?",
    answer: "One Piece",
    options: [
      "Noragami",
      "Dragon Ball",
      "One Piece",
      "AOT"
    ]

  }


]




