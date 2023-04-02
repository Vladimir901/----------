import React from 'react'
import './Meeting.css'

function Meeting(props) {
  return (
    <div>
        <h4 className='meetingDatetimeText'>Событие {props.elem.datetimeMeeting}</h4>
        <div className='ManageProtocolContainer'>
            <h5 className='documentName_text'>Протокол правления</h5>
            <a href='#' className='download_link' download>Скачать</a>
        </div>
        <div className='MeetingProtocolContainer'>
            <h5 className='documentName_text'>Протокол собрания</h5>
            <a href='#' className='download_link' download>Скачать</a>
        </div>
        <div className='DecisionContainer'>
            <h5 className='documentName_text'>Решение</h5>
            <a href='#' className='download_link' download>Скачать</a>
        </div>
    </div>
  )
}

export default Meeting