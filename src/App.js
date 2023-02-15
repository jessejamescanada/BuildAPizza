import './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import Header from './components/Header';
import Home from './components/Home'
import Size from './components/Size';
import Base from './components/Base'
import MeatToppings from './components/MeatToppings'
import OtherToppings from './components/OtherToppings'
import Signin from './components/Signin'
import Signup from './components/Signup'
import Order from './components/Order'
import PastOrders from './components/PastOrders';
import GuestOrder from './components/GuestOrder';

function App() {
  const [pizza, setPizza] = useState(JSON.parse(sessionStorage.getItem('pizza')) || {size: '', base: '', meatTop: [], otherTop: []})
  const [user, setUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const [total, setTotal] = useState(JSON.parse(sessionStorage.getItem('total')) || 0)

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        setLoggedIn(true)
        setUser(user.displayName)
      }else{
        setLoggedIn(false)
      }
    })
  },[])

  // session storage for pizza
  useEffect(() => {
    sessionStorage.setItem('pizza', JSON.stringify(pizza))
  },[pizza])

  useEffect(() => {
    sessionStorage.setItem('total', JSON.stringify(total))
  })

  const addSize = (size) => {
    setTotal(size.price)
    setPizza({...pizza, size})
  }

  const addBase = (base) => {
    setPizza({ ...pizza, base })
  }
// meat topiings
  const addMeatToppings = (topping) => {
    let newToppings;
    if(!pizza.meatTop.includes(topping)){
      newToppings = [...pizza.meatTop, topping]
      setTotal(total + 2)
    }else{
      newToppings = pizza.meatTop.filter(item => item !== topping)
      setTotal(total - 2)
    }
    setPizza({...pizza, meatTop: newToppings})
  }

// other toppings
  const addOtherToppings = (topping) => {
    let newToppings;
    if(!pizza.otherTop.includes(topping)){
      newToppings = [...pizza.otherTop, topping]
      setTotal(total + 1)
    }else{
      newToppings = pizza.otherTop.filter(item => item !== topping)
      setTotal(total - 1)
    }
    setPizza({...pizza, otherTop: newToppings})
  }

  return (
    <>
    <Router>
      <Header setUser={setUser} user={user} loggedIn={loggedIn} total={total}/>
      <Routes>
          <Route path='/' element={<Home loggedIn={loggedIn} />} />
          <Route path='/size' element={<Size addSize={addSize} pizza={pizza} />} />
          <Route path='/base' element={<Base addBase={addBase} pizza={pizza}/>} />
          <Route path='/meat-toppings' element={<MeatToppings pizza={pizza} addMeatToppings={addMeatToppings} />} />
          <Route path='/other-toppings' element={<OtherToppings pizza={pizza} addOtherToppings={addOtherToppings} />} />
          <Route path='/order' element={<Order pizza={pizza} setPizza={setPizza} user={user} setTotal={setTotal} total={total} />} />
          <Route path='/signup' element={<Signup setUser={setUser} />} />
          <Route path='/signin' element={<Signin  user={user} setUser={setUser} setTotal={setTotal} pizza={pizza} setPizza={setPizza} />} />
          <Route path='/past-orders' element={<PastOrders setUser={setUser} user={user} pizza={pizza} setPizza={setPizza} setTotal={setTotal}/>} />
          <Route path='/guest-order' element={<GuestOrder pizza={pizza} setPizza={setPizza}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
