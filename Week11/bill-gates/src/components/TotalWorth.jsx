import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';

const TotalWorth = () => {

  const {totalWorth} = useContext(AppContext)

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  return (
    <div className='totalworth-container'>
        <h2 className='total-worth'>${numberWithCommas(totalWorth)}</h2>
    </div>
  )
}

export default TotalWorth