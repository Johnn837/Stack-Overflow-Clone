import React, { useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import copy from 'copy-to-clipboard'

import upVote from '../../assets/sort-up.svg'
import downVote from '../../assets/sort-down.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswer from './DisplayAnswers'
import { postAnswer, deleteQuestion, voteQuestion } from '../../actions/question'

const QuestionsDetails = () => {

    const { id } = useParams()


    const questionsList = useSelector(state => state.questionsReducer)

    const [Answer, setAnswer] = useState('') 
    const User = useSelector((state) => (state.currentUserReducer))
    const Navigate = useNavigate()
    const dispatch = useDispatch()

    const handlePosAnswer = (e, answerLength) => {
        e.preventDefault()
        if(User === null){  
            alert('Login or Signup to answer a question')
            Navigate('/Auth')
        }
        else{
            if(Answer === ''){
                alert('Enter a answer to submit')
            } else{
                dispatch(postAnswer(
                    { 
                        id, 
                        noOfAnswers: answerLength + 1, 
                        answerBody: Answer, 
                        userAnswered: User.result.name, 
                        userId: User.result._id 
                    }))
            }
        }
    }

    const location = useLocation()
    const url = 'http://localhost:3000'

    const handleShare = () => {
        copy(url + location.pathname)
        alert( "Copied to clipoard : " + url + location.pathname )
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, Navigate))
    }

    function stringToHslColor(str, s, l) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        var h = hash % 360;
        return 'hsl('+h+', '+s+'%, '+l+'%)';
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote', User.result._id))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote', User.result._id))
    }

    return (
        <div className='question-details-page'>
            {
                questionsList.data === null ?
                <h1>Loading ...</h1>:
                <>
                    {
                        questionsList.data.filter(question => question._id === id).map(question => (
                            <div key={question._id}>
                                <section className='question-details-container'>
                                    <h1>{question.questionTitle}</h1>
                                    <div className='question-details-container-2'>
                                        <div className='question-votes'>
                                            <img src= {upVote} alt='upVote' width={18} className='votes-icon' onClick={handleUpVote}/>
                                            <p>{question.upVote.length - question.downVote.length}</p>
                                            <img src= {downVote} alt='downVote' width={18} className='votes-icon' onClick={handleDownVote}/>
                                        </div>
                                        <div style={{width: "100%"}}>
                                            <p className='question-body'>{question.questionBody}</p>
                                            <div className='question-details-tags'>
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className='question-actions-user'>
                                                <div>
                                                    <button type='button' onClick={handleShare}> Share </button>
                                                    {
                                                        User?.result?._id === question?.userId && (
                                                            <button type='button' onClick={handleDelete}> Delete </button>
                                                        )
                                                    }
                                                </div>
                                                <div>
                                                    <p>Asked {moment(question.askedOn).fromNow()} </p>
                                                    <Link to={`/User/${question.userId}`} className='user-link' style={{color: "#0086d8"}}>
                                                        <Avatar backgroundColor={stringToHslColor(question.userPosted,80,70)} px='12px' borderRadius={4} py='5px'>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                            <div>
                                                                {question.userPosted}
                                                            </div> 
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {
                                    question.noOfAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} Answers </h3>
                                            <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                                        </section>
                                    )
                                }
                                <section className='post-ans-container'>
                                    <h3>
                                        Your Answer
                                    </h3>
                                    <form onSubmit={ (e) => { handlePosAnswer(e, question.answer.length) }}>
                                        <textarea cols="30" rows="10" onChange = { e => setAnswer(e.target.value)}></textarea>
                                        <input type="submit" className='post-ans-btn' value='Post Your Answer'></input>
                                    </form>
                                    <p>
                                        Browse other questions tagged
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to='/Tags' key={tag} className='ans-tags'> {tag} </Link>
                                            ))
                                        } or
                                        <Link to = '/AskQuestion' style={{textDecoration: "none", color: "#009dff"}}> Ask A Question</Link>
                                    </p>
                                </section>
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}

export default QuestionsDetails
