import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './Auth.css'
import icon from '../../assets/icon.png'
import AboutAuth from './AboutAuth'

import { signup, login } from '../../actions/auth.js'

const Auth = () => {
  const [isSignUP, setIsSignUP] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSwitch = () => {
    setIsSignUP(!isSignUP)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!email && !password){
        alert('Enter email and password')
    }
    if(isSignUP){
        if(!name){
            alert("Enter a name to continue")
        }
        dispatch(signup({ name, email, password }, navigate))
    }else{
        dispatch(login({ email, password }, navigate))
    }
}

  return (
    <section class='auth-section'>
      { isSignUP && 
        <AboutAuth/>
      }

      <div className='auth-container-2'>
        { !isSignUP && <img src={icon} alt='stack-overflow' className='login-logo'/>}
        <form onSubmit={handleSubmit}>
          { isSignUP && (
              <label htmlFor='name'>
                <h4>Display Name</h4>
                <input type="text" id='name' name='name' onChange={(e) => {setName(e.target.value)}}/>
              </label>
          )
          }

          <label htmlFor='email'>
            <h4>Email</h4>
            <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
          </label>

          <label htmlFor='password'>
            <div style={{display: "flex", justifyContent: "space-between",}}>
              <h4>Password</h4>
              { !isSignUP && <p style={{color: "#007ac6", fontSize: "13px", cursor: "pointer"}}>Forgot Password?</p> }
            </div>
            <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
            { 
            isSignUP && 
            <p style={{color: "#666767", fontSize:"13px"}}>Passwords must contain at least eight <br/>characters, including at least 1 letter and 1<br/> number.</p>
            }
          </label>

          { isSignUP && (
            <label htmlFor='check'>
              <input type="checkbox" id='check'/>
              <p style={{fontSize:"13px"}}>Opt-in to receive occasional,<br/>products,updates,user research invitations,<br/>company announcements,and digests.</p>
            </label>
          ) 
          }
          <button type='Submit' className='auth-btn'>{ isSignUP ? 'Sign UP' : 'Login' }</button>
          { isSignUP && (
              <p style={{color: "#666767", fontSize:"13px"}}>
                By clicking "Sign Up", you agree to our  
                <span style={{color: "#007ac6"}}> terms of<br/> service</span>, 
                <span style={{color: "#007ac6"}}> privacy policy</span> and 
                <span style={{color: "#007ac6"}}> cookie policy</span>.
              </p>
          )}
        </form>
        <p>
          {isSignUP ? 'Already have an account?' : "Don't have an account?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignUP ?"Login" : "Sign Up" }</button>
        </p>
      </div>
    </section>
  )
}

export default Auth
