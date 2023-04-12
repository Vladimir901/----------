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

  const [events, setEvents] = useState([
    
  ])

  const [futureEvents, setFutureEvents] = useState([
    {
      id: 1,
      time: '18:00',
      date: '2023-04-10',
      place: 'ул.Мирная 44',
      text: 'Настоящим уведомляем о проведении очередного собрания членов СНТ в заочной форме',
      type: 'внеочередной заочной',
      link: '/votingresults/1'
    },
    {
      id: 2,
      time: '14:00',
      date: '2023-03-11',
      place: 'ул.Мирная 44',
      text: 'Настоящим уведомляем о проведении очередного собрания членов СНТ в очно-заочной форме',
      type: 'внеочередной очно-заочной',
      link: '/votingresults/2'
    },
    {
      id: 3,
      time: '15:00',
      date: '2023-03-10',
      place: 'Ул. Ленина д. 14',
      text: 'Настоящим уведомляем о проведении очередного собрания членов СНТ в очной форме',
      type: 'очередной очной',
      link: ''
    },
  ])
  const [pastEvents, setPastEvents] = useState([])
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
  ]);
  useEffect(()=>{
    axios.get("http://localhost:8000/api/meetings")
    .then(res => { setEvents(res.data) })
    // axios.get("http://localhost:8000/api/meetings")
    // .then(res => {

    // })
    },[])
    const dnow = new Date()
    const past = events.filter( event => event.date - dnow<0)
    // console.log(events)
      // localStorage.setItem('events', res.data)})

    // Events.sort((elem1, elem2) => elem1.date-elem2.date)
    // var dnow = new Date()
    // Events.forEach((elem)=>{
    //   if(elem.date!=undefined){
    //     var dmeet = new Date(elem.date + " " + elem.time)
    //     if(dnow-dmeet<0) futureEvents.push(elem)
    //     else pastEvents.push(elem)
    //   }})
      // console.log(futureEvents)
      // console.log(pastEvents)
  
  // const LoadContent = () =>{
  //   var arr = []
  //   JSON.parse(localStorage.getItem('events')).forEach((elem)=>{ 
  //     if(elem.snt_id==localStorage.getItem('snt_id'))
  //     arr.push(elem)
  //   })}

  return (
    <div>
        <Header/>
        <div className="main_container_user">
            <div className="container_user">
              <div className="headerContent_container_user">             
              {isAdmin  ? <h3>Личный кабинет председателя СНТ</h3> : <h3>Личный кабинет члена СНТ</h3>}                                      
              <button className="btnCreate_user" onClick={()=>{navigate(`/user/${localStorage.getItem('user_id')}/cabinet`); }}>{userFIO}</button>
              <div className='tabs'><h4 className={isEventsPage ? 'active_tab' : 'inactive_tab'} onClick={()=> {setIsEventsPage(true) }}>События</h4> / <h4 className={!isEventsPage ? 'active_tab' : 'inactive_tab'} onClick={()=> {setIsEventsPage(false)}}>Архив</h4></div>
              
              {isAdmin && <button className="btnCreate_user" onClick={(e)=>{e.preventDefault(); navigate('/protocol');}}>+ Создать</button>}
              </div>
              
              {isEventsPage ? <div className="events_container_user">
                <div className="futureEvents_user">
                  <h3 className='nameEventsText_user'>События</h3>
                {events.map((elem) =>{
                return <EventElem key={elem.id} event={elem} />
                })}
                </div>
{/* 
                <div className="pastEvents_user">
                <h3 className='nameEventsText_user'>Прошедшие</h3>
                {past.map((elem)=>{
                 return <EventElem key={elem.id} event={elem}/>
                })}
                </div> */}
              </div>
                :
              <div className="archive_container_user">
                <div className="futureEvents_user">
                {events.map((elem)=>{
                 return <Meeting key={elem.id} elem={elem}/>
                })}
                </div>
              </div>}

            </div>
        </div>
    </div>
  )
}

export default EventsPage