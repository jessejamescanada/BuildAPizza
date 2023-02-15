import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

const Home = ({loggedIn}) => {

  return (
    <div className="home-container">
      <div className="home-content">
        <motion.div className="home-btn-container"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.3, duration: 1}}
        >
          <h2>Welcome to Build-A-Pizza</h2>
          <div className="home-btn-wrapper">
          <Link to='/size'>
            <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 8px rgb(255,255,255)"
                }}
            >Create Pizza</motion.button>
        </Link>
        {loggedIn ? 
        <Link to='/past-orders'>
          <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 8px rgb(255,255,255)"
                }}>Profile</motion.button>
        </Link>
      :
      ''}
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default Home