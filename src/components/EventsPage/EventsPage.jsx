import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './EventsPage.css'
import Header from '../Header/Header'
import EventElem from './Event/EventElem'
import Meeting from './Meeting/Meeting'

function EventsPage() {

  const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("is_admin")))
  const [userFIO, setUserFIO] = useState(localStorage.getItem("user_fio_short"))
  const [isEventsPage, setIsEventsPage] = useState(true)
  const navigate = useNavigate()

  const [currEvents, setCurrEvents] = useState([ ])
  const [solvedEvents, setSolvedEvents] = useState([ ])
  const [archiveDocs, setArchiveDocs] = useState([
    {
      id: 30001,
      datetimeMeeting: "26.03.2023 17:30-18:00",
      ManageProtocol: '',
      MeetingProtocol: '',
      Decision: '',  
      fileLink: "http://127.0.0.1:8000/download/18/"           
    },
    {
      id: 30002,
      datetimeMeeting: "25.03.2023 17:30-18:00",
      ManageProtocol: '',
      MeetingProtocol: '',
      Decision: '', 
      fileLink: "http://127.0.0.1:8000/download/18/"     
    },
  ])

    useEffect(()=>{
      if(localStorage.getItem('user_fio')=="" || localStorage.getItem('user_fio')==null || localStorage.getItem('user_fio')==undefined)
      navigate('/auth')
    axios.get("http://localhost:8000/api/meetings")
    .then(res => { 
      setCurrEvents(res.data.filter(item => item.is_solved == false)) 
      setSolvedEvents(res.data.filter(item => item.is_solved == true))
      })
    },[])

  return (
    <div>
        <Header/>
        <div className="main_container_user">
            <div className="container_user">
              <div className="headerContent_container_user">             
              {isAdmin  ? <h3>Личный кабинет председателя СНТ</h3> : <h3>Личный кабинет члена СНТ</h3>}                                                   
              {/* <div className='tabs'>
                <h4 className={isEventsPage ? 'active_tab' : 'inactive_tab'} onClick={()=> {setIsEventsPage(true)}}>События</h4> 
                / <h4 className={!isEventsPage ? 'active_tab' : 'inactive_tab'} onClick={()=> {setIsEventsPage(false)}}>Архив</h4>
                </div> */}     
                <div className="headerButtons_container_user">
              {isAdmin && <button className="btnCreate_user" onClick={(e)=>{e.preventDefault(); navigate('/protocol');}}>+ Создать</button>}
              <button className="btnCabinet_user" onClick={()=>{navigate(`/user/${localStorage.getItem('user_id')}/cabinet`); }}>{userFIO}</button>
              </div>
              </div>
              
              {isEventsPage ? 
              <div className="events_container_user">
                <div className="futureEvents_user">
                  <h3 className='nameEventsText_user'>Предстоящие события</h3>
                {currEvents.length==0 ? <h3>Предстоящих событий нет</h3> : currEvents.map((elem) =>{
                  return <EventElem key={elem.id} event={elem} />
                })}</div>
                <div className="pastEvents_user">
                  <h3 className='nameEventsText_user'>Завершённые события</h3>
                {solvedEvents.length==0 ? <h3>Завершённых событий нет</h3> : solvedEvents.map((elem) =>{
                return <EventElem key={elem.id} event={elem} />
                })}</div>
                </div>
                :
              <div className="archive_container_user">
                <div className="futureEvents_user">
                {/* {events.length==0 ? <h3>Документов нет</h3> : events.map((elem)=>{
                 return <Meeting key={elem.id} elem={elem}/>
                })} */}
                </div>
              </div>}

            </div>
        </div>
    </div>
  )
}

export default EventsPage