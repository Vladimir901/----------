import React from 'react'
import './AboutPage.css'
import Header from '../Header/Header'

function AboutPage() {
  return (
    <div>
      <Header/>
      <div className="main_container_aboutPage">
        <div className="container_aboutPage">
          <h1>О нас</h1>
          <h2></h2>
          <div style={{marginTop:"2%"}}>
          <h3>Наши контакты:</h3>
        <h3>Телефон: 8-800-555-35-35</h3>
        <h3>E-mail: snt1@mail.ru</h3>
          </div>
        
        </div>
        </div>
    </div>
  )
}

export default AboutPage