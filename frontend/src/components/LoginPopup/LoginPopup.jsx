import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setshowLogin}) => {

    const[currState,setCurrState] = useState("Sign Up")

  return (
    <div className='loginpopup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setshowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
      </form>
    </div>
  )
}

export default LoginPopup
