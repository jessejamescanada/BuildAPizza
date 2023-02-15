import React from 'react'
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'
import {FaLongArrowAltRight} from 'react-icons/fa'
import BackButton from './BackButton';

const OtherToppings = ({ pizza, addOtherToppings}) => {
  const toppings = ['Mushrooms', 'Peppers', 'Onions', 'Olives', 'Feta Cheese', 'Extra Cheese', `Pineapple`]
  return (
    <motion.div className="toppings-container"
        initial={{x: '100vw'}}
        animate={{x: 0}}
        transition={{type: 'spring', delay: 0.3, stiffness:50}}
    >
      <div className="toppings-content">
      <h3>Step 4: Toppings -$1 Each</h3>
      <div className="border"></div>
      <ul>
        {toppings.map((topping) => {
          let spanClass = pizza.otherTop.includes(topping) ? 'active' : ''
          return(
            <motion.li key={topping} onClick={() => addOtherToppings(topping)}
              whileHover={{scale: 1.1, color: 'rgb(255, 136, 0)', originX: 0}}
              transition={{type: 'spring', stiffness: 300}}
            > 
            <span className={spanClass}>
              {topping}
            </span>
            </motion.li>
          )
        })}
      </ul>

      {pizza.otherTop &&(
        <div className="btn-container">
          <BackButton />
            <div className="next">
              <Link to='/order'>
                <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 8px rgb(255,255,255)"
                }}>
              Order<FaLongArrowAltRight/></motion.button>
              </Link>
            </div>
        </div>
      )}
    </div>
    </motion.div>
  )
}

export default OtherToppings