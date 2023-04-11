import React from 'react'
import './MeetingResultPage.css'
import Header from '../Header/Header'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function MeetingResultPage(props) {
  const navigate = useNavigate()
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  const questions = useState([
    {id:1, question:'Принятие новых членов в СНТ'}, 
    {id:2, question:'Утверждение приходно-расходной сметы и принятие решения о ее исполнении'}
  ])
  const onSubmit = (data) =>{
    if(data)
      navigate('/meetingdocs/1')
    //alert(JSON.stringify(data.questionsSelection))
    //reset() сброс данных формы
  }
  return (
    <div>
      <Header/>
      <div className="main_container_resultPage">    
          <div className="form_container_resultPage">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className='headerText_resultPage'>Введите результаты собрания</h2>
            
            <h4>1. Утверждение финансово-экономического обоснования взносов на 2023г. финансовый год</h4>
            <h5>За</h5><input type='text' className='inputText_resultPage' placeholder='Количество голосов'/>
            <h5>Против</h5><input type='text' className='inputText_resultPage' placeholder='Количество голосов'/>
            <h5>Воздержались</h5><input type='text' className='inputText_resultPage' placeholder='Количество голосов'/>
            <h5>Решение</h5><textarea className='inputTextArea_resultPage' placeholder='Введите решение'/>
            
            <h4 className='headerText_resultPage'>2. Утверждение приходно-расходной сметы товарищества на 2023г. финансовый год</h4>
            <h5>За</h5> <input type='text' className='inputText_resultPage' placeholder='Количество голосов'/>
            <h5>Против</h5><input type='text' className='inputText_resultPage' placeholder='Количество голосов'/>
            <h5>Воздержались</h5><input type='text' className='inputText_resultPage' placeholder='Количество голосов'/>
            <h5>Решение</h5><textarea className='inputTextArea_resultPage' placeholder='Введите решение'/>
            <div className="resultPage_btn_container">
            <input type='submit' className='btn_resultPage' value="Перейти к документам"/>
            </div>
            {/* {questions.map((elem)=>{
              return <QuestionAndDecisionElem key={elem.id} elem={elem} />
              })} */}
          </form>    
          </div>
        </div>     
    </div>
  )
}

export default MeetingResultPage