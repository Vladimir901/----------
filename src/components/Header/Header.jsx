import React, { useEffect, useState } from 'react'
import './Header.css'
import { NavLink, Link } from 'react-router-dom'

function Header() {
  const [userId, setUserId] = useState(null)
  const [sntName, setSntName] = useState('СНТ')
  const [userFIO, setUserFIO] = useState('Личный кабинет')
  useEffect(()=>{
    setUserId(localStorage.getItem('user_id')!=undefined?localStorage.getItem('user_id'):null)
    setSntName(localStorage.getItem('snt_name')!=undefined?localStorage.getItem('snt_name'):"СНТ")
    setUserFIO(localStorage.getItem('user_fio_short')!=undefined?localStorage.getItem('user_fio_short'):"Личный кабинет")
  },[])
  return (
    <div>
        <header className='header'>
            <div className="logo"><h2>СНТ Плюс</h2></div>
            <nav className='nav'>
              <h4 className='nav_dropdown'>{sntName}</h4>
              <Link to={"/"} ><h4>Главная</h4></Link>
              <Link to={userFIO ? `/user/${userId}/events` :"/auth"}><h4>{userFIO ? userFIO :'Личный кабинет'}</h4></Link>
              <Link to={"/faq"}><h4>Вопросы и ответы</h4></Link>
              <Link to={"/about"}><h4>О нас</h4></Link>
            </nav>
        </header>
    </div>
  )
}
// Header.defaultProps = {
//   user_id : 1,
//   fio : "",
//   snt : "",
// }
export default Header