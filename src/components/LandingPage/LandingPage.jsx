import React from 'react'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import Header from '../Header/Header';

function LandingPage() {
    return (
        <div className='main_container_landing'>
            <Header/>
            <div className="container_landing">
                <div className="text_container_landing"><p><b>СНТ Плюс</b> <br/> онлайн помощник для проведения собрания членов СНТ.<br/> 
                    Мы расскажем вам с чего начать и доведем до последнего этапа - составления протокола решения.</p></div>
                    <Link to={localStorage.getItem('user_id')!=undefined?`/user/${localStorage.getItem('user_id')}/events`:'/auth'}><button className='btn_landing'>Войти</button></Link>
            </div>
        </div>       
    )
}

export default LandingPage