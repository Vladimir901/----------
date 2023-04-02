import React from 'react'
import './MeetingDocumentsPage.css'
import Header from '../Header/Header'

function MeetingDocumentsPage() {
  return (
    
    <div>
        <Header fio={'Председателев П.П.'} snt={'СНТ1'}/>
        <div className="main_container_meetingdocsPage">    
            <div className="form_container_meetingdocsPage">
                <div className="headerText_container">
                <h1>Документы</h1>
                </div>
                <div className="meetingDocs_container">
                <div className="managementProtocol_container">
                    <h4>Протокол правления</h4>
                    <a href='#' download={''}>Скачать</a>
                </div>
                <div className="meetingProtocol_container">
                    <h4>Протокол собрания</h4>
                    <a href='#' download={''}>Скачать</a>
                </div>
                <div className="decisionProtocol_container">
                    <h4>Решение</h4>
                    <a href='#' download={''}>Скачать</a>
                </div>
                </div>
            </div>
        </div>
        
        MeetingDocumentsPage
    </div>
  )
}

export {MeetingDocumentsPage}