import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import './NotFound.css'

function NotFound() {
  return (
    <div>    
      <Header/> 
    <div className='main_container_notfound'>
      <div className="text_container_notfound">
        <h1 className='text_notfound'>Страница не найдена</h1>
        <Link to={"/"}><button className='linkToMain_notfound'>Вернуться на главную</button></Link>
      </div>
    </div>
     </div>
  )
}

export default NotFound