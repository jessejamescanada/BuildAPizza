import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {getAuth} from 'firebase/auth'
import {motion} from 'framer-motion'
import '../App.css'

const Header = ({setUser, user, loggedIn, total}) => {

  const navigate = useNavigate()
  const auth = getAuth()
    // logout
    const onLogout = () => {
      auth.signOut()
      setUser('')
      navigate('/')
      }
  return (
    <header>
      <div className="header-container">
        <div className="header-content">
            {/* <div className="logo">LOGO</div> */}
            <motion.div 
            initial={{boxShadow: "none", textShadow: 'none'}}
              animate={{boxShadow: "0px 0px 8px rgb(255,255,255)",
                        textShadow: "0px 0px 8px rgb(255,255,255)"
                        }}
              transition={{ delay: 1, duration: 1}}
              className="header-title" onClick={() => navigate('/')}>Build - A - Pizza</motion.div>
              <div className="total-profile">
                       
             {loggedIn ? 
              <>
              <div className="loggedin-header-total">
              <div className="loggedin-header" onClick={() => navigate('/past-orders')}>
                Welcome back, {user}
  
              </div>
              </div>
  
              </>
  
              :
                <Link to='/signin'>
                  <button>Sign In</button>
                </Link>
            }
            {total > 0 ? 
              <div className="total">Your total is: ${total}</div>  
              :
              ''
            }  

              </div>

            
        </div>
      </div>
    </header>
  )
}

export default Header