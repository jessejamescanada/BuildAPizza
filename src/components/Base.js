import React from 'react'
import { Link } from 'react-router-dom';
import {FaLongArrowAltRight } from 'react-icons/fa'
import {motion} from 'framer-motion'
import BackButton from './BackButton';

const Base = ({ addBase, pizza,  }) => {
  const bases = ['Classic', 'Thin & Crispy', 'Thick']

  return (
    <motion.div className="toppings-container"
    initial={{x: '100vw'}}
    animate={{x: 0}}
    transition={{type: 'spring', delay: 0.3, stiffness:50}}
    exit={{x: '-100vw', transition: {ease: 'easeInOut'}}}
    >
      <div className="toppings-content">
      <h3>Step 2: Choose Your Crust</h3>
      <div className="border"></div>
      <ul>
        {bases.map((base) => {
          let spanClass = pizza.base === base ? 'active' : ''
                    
          return(
            <motion.li key={base} onClick={() => addBase(base)}
              whileHover={{scale: 1.1, color: 'rgb(255, 136, 0)', originX: 0}}
              transition={{type: 'spring', stiffness: 300}}
            >
              <span className={spanClass}>
                {base}
              </span>
            </motion.li>
          )
        })}
      </ul>
      
      <div className="btn-container">
        <BackButton />
          
            <div className="next">
              <Link to='/meat-toppings'>
                <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 8px rgb(255,255,255)"
                }}>Next <FaLongArrowAltRight/></motion.button>
              </Link>
            </div>
      </div>
    </div>
    </motion.div>
  )
}

export default Base