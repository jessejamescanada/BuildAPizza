import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';
import {FaLongArrowAltRight} from 'react-icons/fa'
import {motion} from 'framer-motion'
import BackButton from './BackButton';
import '../App.css'

const MeatToppings = ({ pizza, addMeatToppings,}) => {
  const meats = ['Steak', 'Chicken', 'Ground Beef', 'Ham', 'Pepperoni']

  return (
    <motion.div className="toppings-container"
        initial={{x: '100vw'}}
        animate={{x: 0}}
        transition={{type: 'spring', delay: 0.3,stiffness:50}}
    >
      <div className="toppings-content">
      <h3>Step 3: Meats -$2 Each</h3>
      <div className="border"></div>
      <ul>
        {meats.map((meat) => {
          let spanClass = pizza.meatTop.includes(meat) ? 'active': ''
          return(
            <motion.li key={meat} onClick={() => addMeatToppings(meat)}
              whileHover={{scale: 1.1, color: 'rgb(255, 136, 0)', originX: 0}}
              transition={{type: 'spring', stiffness: 300}}
            >
              <span className={spanClass}>
                {meat}
              </span>
            </motion.li>
          )
        })}
      </ul>

<div className="btn-container">
<BackButton />
      {pizza.meatTop &&(
        <div className="next">
          <Link to='/other-toppings'>
            <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 8px rgb(255,255,255)"
                }}>
              Next <FaLongArrowAltRight/></motion.button>
          </Link>
        </div>
      )}
      </div>
    </div>
  </motion.div>
  )
}

export default MeatToppings