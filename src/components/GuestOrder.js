import React, {useEffect} from 'react'

const GuestOrder = ({setPizza}) => {
    useEffect(() => {
        setPizza({
            size: '',
            base: '',
            meatTop: [],
            otherTop: []
          })
    },[])
  return (
    <div className="past-orders-container">
        <div className="past-orders-content">
            <h3>Thank you for your order!</h3>
        </div>
    </div>
  )
}

export default GuestOrder