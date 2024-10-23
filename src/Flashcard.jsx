import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'


export default function Flashcard({ flashcard}) {

  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height

    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(()=>{
    setMaxHeight()

    window.addEventListener('resize', setMaxHeight)

    return () => window.removeEventListener('resize', setMaxHeight)

  }, [flashcard.question, flashcard.options, flashcard.answer])


  return(

    <div 
    className={`card ${flip ? 'flip' : ''}`}
    style={{height: height}}
    onClick={()=> setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {flashcard.question}

        <div className="flashcard-options">
          {flashcard.options.map((option, index) =>{
            return(
              <div className="flashcard-option" key={index}>{option}</div>
            )
          })}
        </div>
      </div>
      <div className="back" ref={backEl}>
        {flashcard.answer}
      </div>

    </div>
  )


}


