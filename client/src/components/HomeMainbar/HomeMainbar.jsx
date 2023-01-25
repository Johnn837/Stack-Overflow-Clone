import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './HomeMainbar.css'
import QuestionList from './QuestionList'

const HomeMainbar = () => {

  const location = useLocation()
  const navigate = useNavigate()

  const user = 1;

  const questionsList = useSelector(state => state.questionsReducer)

  // var questionsList = [{
  //   _id: 1,
  //   upVotes: 3,
  //   downVotes: 2,
  //   noOfAnswers: 2,
  //   questionTitle: "What is JSX used for ?",
  //   questionBody: "Why is JSX used in most react application? What are the benefits of using it?",
  //   questionTags: ["javascript", "react", "node", "jsx"],
  //   userPosted: "John",
  //   userId: 1,
  //   askedOn: "Jan 13",
  //   answer: [{
  //     answerBody: "Can I get a hoooyah",
  //     userAnswered: "Hooyah Guy",
  //     answeredOn: "Jan 14",
  //     userId: "2"
  //   }]
  // },{
  //   _id: 2,
  //   upVotes: 8,
  //   downVotes: 4,
  //   noOfAnswers: 0,
  //   questionTitle: "What is JSX used for ?",
  //   questionBody: "Why is JSX used in most react application? What are the benefits of using it?",
  //   questionTags: ["javascript", "react", "node", "jsx"],
  //   userPosted: "Hooyah Guy",
  //   userId: 2,
  //   askedOn: "Jan 10",
  //   answer: [{
  //     answerBody: "Can I get a hoooyah",
  //     userAnswered: "Hooyah Guy",
  //     answeredOn: "Jan 14",
  //     userId: "2"
  //   }]
  // }]

  const checkAuth = () => {
    if(user === null){
      alert("Login to ask a Question")
      navigate('/Auth')
    }
    else{
      navigate('/AskQuestion')
    }
  }
 
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
          {
            location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
          }
          <button onClick={checkAuth} className='ask-btn'> Ask Question </button>
      </div>
      <div>
        {
          questionsList.data === null ?
          <h1>Loading...</h1> :
          <>
            <p>{questionsList.data.length} Questions</p>
            <QuestionList questionsList = {questionsList.data} />
          </>
        }
      </div>
    </div>
  )
}

export default HomeMainbar
