import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import {FaLongArrowAltRight} from 'react-icons/fa'

const Size = ({addSize, pizza}) => {
    const sizes = [{size: 'Small', price: 10}, {size: 'Medium', price: 15}, {size: 'Large', price: 20}, {size: 'Party', price: 25}]


    
  return (
    <motion.div className="toppings-container"
            initial={{x: '100vw'}}
            animate={{x: 0}}
            transition={{type: 'spring', delay: 0.3,stiffness:70}}
    >
        <div className="toppings-content">
            <h3>Step 1: Choose Your Size</h3>
            <div className="border"></div>
            <ul>
                {sizes.map((item) => {
                     let spanClass = pizza.size.size === item.size ? 'active' : ''
                    return(
                        <motion.li key={item.size} onClick={() => addSize(item)}
                            whileHover={{scale: 1.1, color: 'rgb(255, 136, 0)', originX: 0}}
                            transition={{type: 'spring', stiffness: 300}}
                        >
                            <span className={spanClass}>
                                {item.size} - ${item.price}
                            </span>
                        </motion.li>
                    )
                })}
            </ul>
            {pizza.size && (
                <motion.div className="next"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: .3 , duration: 0.2}}
                >
                    <Link to='/base'>
                        <motion.button
                        
                            whileHover={{
                            scale: 1.1,
                            boxShadow: "0px 0px 8px rgb(255,255,255)"
                            }}>Base <FaLongArrowAltRight/></motion.button>
                    </Link>
                </motion.div>
            )}
        </div>
    </motion.div>
  )
}

export default Size