import React from 'react'
import Flashcard from './Flashcard'
import { v4 as uuidv4 } from 'uuid'




export default function FlashCardList({flashcards}) {

  return(
    <div className="card-grid">
      {flashcards.map(flashcard =>{
        return <Flashcard flashcard={flashcard} key={uuidv4()}/>
      })}
    </div>
  )
}
  


