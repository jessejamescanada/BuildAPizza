import React from 'react'

const DisplayPastOrders = ({item}) => {
    const {size, base, meatTop, otherTop} = item.data
  return (
    <div className='past-order-li'>
            <li>{size.size} - {base}</li>
            <li>{meatTop.join(', ')}</li>
            <li>{otherTop.join(', ')}</li>
    </div>
  )
}

export default DisplayPastOrders
