import React from 'react'
import {motion} from 'framer-motion'
import {FaPizzaSlice} from 'react-icons/fa'
import { IconContext } from "react-icons";

const PizzaSpinner = () => {
  return (
    <IconContext.Provider value={{className: "pizza-spinner",  }}>
    <div>
        <FaPizzaSlice />
    </div>
    </IconContext.Provider>
  )
}

export default PizzaSpinner