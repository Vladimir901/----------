import React, { useState } from 'react'
import './FAQPage.css'
import AccordionElem from '../AccordionElem/AccordionElem'
import Header from '../Header/Header'
import { information } from "./dataForFAQPage.js";

function FAQPage() {
const [clicked, setClicked] = useState("0");
const handleToggle = (index) => {
    if (clicked === index) {
      return setClicked("0");
    }
    setClicked(index);
  };
  return (
    <div>
        <Header/>
        <div className='main_container_faqPage' >
            <div className="container_faqPage">
            <div className="content_container_faqPage">
            <h1>Вопросы и ответы</h1>
      {information.map((item, index) => {
        return <div key={index} className='item_faqPage'>
            <div className="question">
            <b>Вопрос: {item.question}</b></div>
            <div className="answer">
               Ответ: <div className='answerLinks' dangerouslySetInnerHTML={{__html: item.answer}}></div>
               </div>
        </div> 
      })}
      </div>
      </div>
        </div>
        <div className="tip_container_faqPage">
        <p><b>Важно!</b>Информация на сайте размещена и составлена на основе общедоступных источников по состоянию законодательства 05.04.2023г.</p>
        <p>Справка предоставлена для информирования пользователей, не является юридической консультацией.</p>
        </div>
    </div>
    
  )
}

export default FAQPage