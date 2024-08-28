import React from 'react'
import './FoodItem.css'


const FoodItem = ({id,name,price,description,image}) => {
  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={image} alt="" />
        </div>
      
    </div>
  )
}

export default FoodItem
