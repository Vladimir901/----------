import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'

function Header(props) {
  return (
    <div>
        <header className='header'>
            <div className="logo"><h2>СНТ Плюс</h2></div>
            <nav className='nav'>
              <h4 className='nav_dropdown'>{props.snt ? props.snt :'Выберите СНТ'}</h4>
              <NavLink exact to={"/"} ><h4>Главная</h4></NavLink>
              <NavLink to={props.fio ? "/user/1/events" :"/auth"}><h4>{props.fio ? props.fio :'Личный кабинет'}</h4></NavLink>
              <NavLink to={"/about"}><h4>О нас</h4></NavLink>
              <NavLink to={"/contacts"}><h4>Контакты</h4></NavLink>
            </nav>
        </header>
    </div>
  )
}
Header.defaultProps = {
  fio : "",
  snt : "",
}
export default Header