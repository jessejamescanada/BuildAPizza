import React from 'react'
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import {FaLongArrowAltLeft} from 'react-icons/fa'

const BackButton = () => {
    const navigate = useNavigate()
  return (
    <div className="back-button">
        <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 8px rgb(255,255,255)"
                }} 
        onClick={() => navigate(-1)}><FaLongArrowAltLeft style={{marginRight: '3px'}}/> Go Back</motion.button>
    </div>
  )
}

export default BackButton