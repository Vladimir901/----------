import React from 'react'
import './Meeting.css'

function Meeting(props) {
  return (
    <div>
        <h4 className='meetingDatetimeText'>Событие {props.elem.datetimeMeeting}</h4>
        <div className='archive_container_events'>
            <h5 className='documentName_text'>Архив документов</h5>
            <a href={'http://127.0.0.1:8000/download/18/'} className='download_link' download>Скачать</a>
        </div>
    </div>
  )
}

export default Meeting