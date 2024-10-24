import React, { useState, useEffect, useRef} from 'react'
import "./app.css"
import FlashCardList from './FlashCardList'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'




export default function App() {


  const [flashcards, setFlashcards] = useState([])
  const [totalquestions, setTotalquestions] = useState([])

    const [category, setCategory] = useState([])



  useEffect(()=>{

    requestCategories()

    setTimeout(() => {
      requestCards()
    }, 1000);

    setTimeout(()=>{
      requestGlobalQuestions()
    }, 1000)
    
  
    
  },[])


    const categoryEl = useRef()
    const amountEl = useRef()
    

    function handlesubmit (e){
        e.preventDefault()

        
        setTimeout(() => {
          requestCards()
        }, 2000);
        
    }

    function requestCards() {
      axios
    .get('https://opentdb.com/api.php', {
      params:{
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
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
    } 

    
      function decodeString (string){
        const textArea = document.createElement('textarea')
        textArea.innerHTML = string
        return textArea.value
    
      }

  
      function requestGlobalQuestions (){
        axios
        .get('https://opentdb.com/api_count_global.php')
        .then(res =>{
          const totalAMoutofQuestions = res.data.overall
          
          setTotalquestions(totalAMoutofQuestions)
        })
        
      }

  
  

  function requestCategories (){
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
      const formattedOptions = res.data.trivia_categories.map((categoryItem)=>{
        return {
          id: categoryItem.id,
          category: categoryItem.name
        }
      })
      setCategory(formattedOptions)

      
    })
  }


  return(
    <>
    <form className='header' onSubmit={handlesubmit}>
        <div className="form-group">
            <label htmlFor="category">category</label>
            <select id="category" ref={categoryEl}>
                {category.map((categoryItem, index) =>{
                    return <option key={index} value={categoryItem.id}>{categoryItem.category}</option>
                })}
            </select>
        </div>
        <div className="form-group">
            <label htmlFor="amount">Number of questions</label>
            <input type="number" name="" id="amount" min={1} step={1} defaultValue={10} ref={amountEl}/>
        </div>
        <div className="form-group">
            <button className='btn'>Generate</button>
        </div>
    </form>
    <div className="container">
      <div className="global-question-amount">
        <p className='global-amount'>There are <strong>{totalquestions.total_num_of_verified_questions}</strong> questions available in the DataBase</p>
      </div>
      <FlashCardList flashcards = {flashcards}/>
    </div>
    </>
    
    
  )

  

  
}











