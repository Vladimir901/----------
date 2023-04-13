import React from 'react'
import './MeetingDocumentsPage.css'
import Header from '../Header/Header'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function MeetingDocumentsPage() {
    const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
    const navigate = useNavigate()
    const onSubmit = (data) =>{
        if(data)
            {
            navigate('/', {  }) 
            
        }
        //alert(JSON.stringify(data.questionsSelection))
        //reset() сброс данных формы
      }
    return (   
    <div>
        <Header/>
        <div className="main_container_meetingdocsPage">    
            <div className="form_container_meetingdocsPage">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="headerText_container">
                <h1>Документы</h1>
                </div>
                <div className="meetingDocs_container">
                <div className="managementDocs_container">
                    <h4>Протокол правления</h4>
                </div>
                <div className="managementDocs_container">
                    <h4>Уведомление о проведении общего собрания</h4>
                </div>
                <div className="managementDocs_container">
                    <h4>Протокол собрания</h4>                    
                </div>
                <div className="managementDocs_container">
                    <h4>Решение</h4>
                </div>
                <a href='http://127.0.0.1:8000/download/20/' download target='_blank' className='downloadDocs_link'>Скачать архивом</a>
                </div>
                <div className="btn_container_meetingdocsPage">
                <input type='submit' className='btn_meetingdocsPage' value="На главную"/>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export {MeetingDocumentsPage}