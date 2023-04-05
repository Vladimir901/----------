import React from 'react'
import './Header.css'
import { NavLink, Link } from 'react-router-dom'

function Header(props) {
  return (
    <div>
        <header className='header'>
            <div className="logo"><h2>СНТ Плюс</h2></div>
            <nav className='nav'>
              <h4 className='nav_dropdown'>{props.snt ? props.snt :'Выберите СНТ'}</h4>
              <Link to={"/"} ><h4>Главная</h4></Link>
              <Link to={props.fio ? `/user/${props.user_id}/events` :"/auth"}><h4>{props.fio ? props.fio :'Личный кабинет'}</h4></Link>
              <Link to={"/faq"}><h4>Вопросы и ответы</h4></Link>
              <Link to={"/about"}><h4>О нас</h4></Link>
            </nav>
        </header>
    </div>
  )
}
Header.defaultProps = {
  user_id : 1,
  fio : "",
  snt : "",
}
export default Header