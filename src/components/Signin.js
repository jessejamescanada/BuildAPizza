import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Signin = ({setUser, setTotal, pizza, setPizza}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({email: '', password: ''})
  const [loginError, setLoginError] = useState('')

  const {email, password} = formData
  const navigate = useNavigate()

  const onChange = e => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const passwordShow = e => {
    e.preventDefault()
    setShowPassword((prevState) => !prevState)
  }

  const onSubmit = async e => {
    e.preventDefault()

    try{
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if(userCredential.user){
        navigate('/')
        setUser(userCredential.user.displayName)
        console.log(userCredential.user.displayName)
        setTotal(0)
        setPizza({
          size: '',
          base: '',
          meatTop: [],
          otherTop: []
        })
      }

    }catch(err){
      if(err){
        setLoginError('Error signing in')
        setTimeout(() => {
          setLoginError('')
        }, 3000)
      }
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-content">
        <header>Welcome Back!</header>
        <div className="signin-form-container">
          <form onSubmit={onSubmit}>

            <div className="password-input">
            <input type="email"
                placeholder='email'
                id='email'
                value={email}
                onChange={onChange}
            />
            <input type={showPassword ? 'text' : 'password'}
                placeholder='password'
                id='password'
                value={password}
                onChange={onChange}
            />
            </div>
            <button onClick={(e) => passwordShow(e)}>Show Password</button>

            <div className="signin-btn-container">
                
                <button>Sign In</button>
            </div>
            <div className="error">{loginError}</div>
          </form>
          <div className="signup-instead">
          {/* <p>Sign up instead</p> */}
          <Link to='/signup'>
            <button>Sign Up</button>
          </Link>
          {/* <Link to='/forgot-password'>FORGOT PASSWORDD</Link> */}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Signin