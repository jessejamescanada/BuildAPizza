import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {db} from '../Firebase-config'
import {motion} from 'framer-motion'
import {FaCheck} from 'react-icons/fa'
import BackButton from './BackButton';
import PizzaSpinner from './PizzaSpinner';

const Order = ({pizza, setPizza, user, setTotal, total, }) => {
  const [showSpinner, setShowSpinner] = useState(false)
  
  const auth = getAuth()
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        setPizza({...pizza, userRef: user.uid})
       
      }else{
        // navigate('/signin')
      }
    })
  },[])

  const redirectHome = () => {
    navigate('/past-orders')
  }

  const confirmOrder = async () => {
      const pizzaCopy = {
        ...pizza,
        id: Math.floor(Math.random() * 1000000),
        timestamp: serverTimestamp()
      }
      const docRef = await addDoc(collection(db, 'pizzas'), pizzaCopy)
      setShowSpinner(true)
      
      setTimeout(() => {
        redirectHome()
        setTotal(0)
        setShowSpinner(false)
        sessionStorage.clear()
      },1000)
    }

    const guestOrder = () => {
      setShowSpinner(true)

      setTimeout(() => {
        navigate('/guest-order')
        setShowSpinner(false)
        sessionStorage.clear()
        setTotal(0)
      },1000)
    }

  return (
    <motion.div className="toppings-container"
        initial={{x: '100vw'}}
        animate={{x: 0}}
        transition={{type: 'spring', delay: 0.3,stiffness:70}}
    >
      {showSpinner ? 
        <motion.div className="spinner"
            initial={{x:0}}
            animate={{x:0, rotate: 360}}
            transition={{duration: .5, repeat: 5}}
        >
            <PizzaSpinner />
        </motion.div>
      :

      <div className="orders-content">
          <h2>Thank you {user}! Your total is ${total}</h2>
          <div className="orders">
            <p>You built a {pizza.size.size.toLowerCase()} pizza with {pizza.base.toLowerCase()} crust with:</p>
              <div className="order-meats">
                <ul>
                  {pizza.meatTop.length > 0 ?
                  <>
                  {pizza.meatTop.map(item => <div key={item}>{item}</div>)}
                          {pizza.otherTop.length > 0 ?
                          <>&</>
                        : ''}       
                  {pizza.otherTop.map(item => <div key={item}>{item}</div>)}
                  </>
                : 
                <>
                {pizza.otherTop.map(item => <div key={item}>{item}</div>)}
                </>
                }
                </ul>
              </div>
             
            <div className="order-go-back">
              <p>Need to make changes to your order?</p>
              <BackButton />
            </div>

            <p>All good?</p>
            {user ? 
                        <motion.button
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0px 0px 8px rgb(255,255,255)"
                        }}  
                        onClick={confirmOrder}>Place Order <FaCheck style={{marginLeft: '3px'}}/></motion.button>
          : <motion.button
            whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 8px rgb(255,255,255)"
          }}  
            onClick={guestOrder}>Place Order <FaCheck style={{marginLeft: '3px'}}/></motion.button>}

          </div>
      </div>
    }    
    </motion.div>
  )
}

export default Order