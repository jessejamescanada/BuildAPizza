import React from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {db} from '../Firebase-config'
import {motion} from 'framer-motion'
import { collection, getDocs, query, where, limit} from 'firebase/firestore'
import DisplayPastOrders from './DisplayPastOrders'

const PastOrders = ({setUser, user, pizza, setPizza, setTotal }) => {
    const [pizzasArray, setPizzasArray] = useState(null)
    const auth = getAuth()
    const navigate = useNavigate()

    // need to run onAuthState... to get the user uid into this component. Then call fetchUserPizzas inside it. Otherwise page refresh crashes app
    useEffect(() => {
        onAuthStateChanged(auth, async(user) => {
            if(user){
                const fetchUserPizzas = async () => {
                    
                    const pizzasRef = collection(db, 'pizzas')
                    const q = query(pizzasRef, where('userRef', '==', auth.currentUser.uid), limit(6))
                    const querySnapshot = await getDocs(q)
            
                    const getPizzas = []
            
                    querySnapshot.forEach((doc) => {
                        return getPizzas.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    setPizzasArray(getPizzas)
                }
                fetchUserPizzas()
            }else{
                console.log('error')
            }
            resetPizzas()
        })
    },[])
    
    const resetPizzas = () => {
        setPizza({
            size: '',
            base: '',
            meatTop: [],
            otherTop: []
        })
    }

// logout
    const onLogout = () => {
        auth.signOut()
        setUser('')
        navigate('/')
        setTotal(0)
    }

  return (
    <motion.div className="past-orders-container"
            initial={{x: '100vw'}}
            animate={{x: 0}}
            transition={{type: 'spring', delay: 0.3,stiffness:70}}
    >
        <h3>{user}'s Past Orders</h3>
        <div className="past-orders-content">
            <ul>
            {pizzasArray &&
            <>
             {pizzasArray.map((item) => (
                <DisplayPastOrders key={item.id} item={item} />
            ))}
            </> 
        }
           </ul>
           <button onClick={onLogout}>LogOut</button>
        </div>
    </motion.div>
  )
}

export default PastOrders