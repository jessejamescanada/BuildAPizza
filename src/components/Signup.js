import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../Firebase-config'

const Signup = ({setUser}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({name: '', email: '', password: ''})
  const {name, email, password} = formData
  const navigate = useNavigate()

    // user registration
    const onChange = e => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value
      }))
    }
  
    const onSubmit = async e => {
      e.preventDefault()
      try{
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        updateProfile(auth.currentUser, {
          displayName: name
        })
  
        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp()
  
        await setDoc(doc(db, 'users', user.uid), formDataCopy)

        // set display name immediately when user signs up
        setUser(userCredential.user.displayName)
  
      }catch(err){
        console.log(err)
      }
      navigate('/')
    }

    const passwordShow = (e) => {
      e.preventDefault()
      setShowPassword((prevState) => !prevState)
    }

  return (
    <div className="signin-container">
      <div className="signin-content">
        <header>Sign Up!</header>
        <div className="signin-form-container">
          <form onSubmit={onSubmit}>
            <input type="text"
                placeholder='name'
                id='name'
                value={name}
                onChange={onChange}
            />
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
            <button onClick={(e) => passwordShow(e)}>Show Password</button>
            <button>Sign Up</button>
          </form>
          <Link to='/signin'>
            <button>Sign in instead</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup