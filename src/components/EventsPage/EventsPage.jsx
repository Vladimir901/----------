import {React, useState} from 'react'
import { useNavigate , Link } from 'react-router-dom'
import './EventsPage.css'
import Header from '../Header/Header'
import EventElem from './Event/EventElem'
import Meeting from './Meeting/Meeting'

function EventsPage() {
  const isAdmin = true
  const [isEventsPage, setIsEventsPage] = useState(true)
  const navigate = useNavigate()
  const [futureEvents, setFutureEvents] = useState([
    {
      id: 10001,
      text: "Настоящим уведомляем о проведении очередного собрания членов СНТ в очно-заочной форме",
      datetime: "27.03.2023 17:30-18:00",
      place: "ул. Ленина, д.14 / сайт СНТ",
      link: '/meetingresult'
    },
  ])
  const [pastEvents, setPastEvents] = useState([
    {
      id: 20001,
      text: "Настоящим уведомляем о проведении очередного собрания членов СНТ в очно-заочной форме",
      datetime: "26.03.2023 17:30-18:00",
      place: "ул. Ленина, д.14 / сайт СНТ",
    },
    {
      id: 20002,
      text: "Настоящим уведомляем о проведении очередного собрания членов СНТ в очно-заочной форме",
      datetime: "25.03.2023 17:30-18:00",
      place: "ул. Ленина, д.14 / сайт СНТ",
    }
  ]);
  const [archiveDocs, setArchiveDocs] = useState([
    {
      id: 30001,
      datetimeMeeting: "26.03.2023 17:30-18:00",
      ManageProtocol: '',
      MeetingProtocol: '',
      Decision: '',             
    },
    {
      id: 30002,
      datetimeMeeting: "25.03.2023 17:30-18:00",
      ManageProtocol: '',
      MeetingProtocol: '',
      Decision: '',   
    },
  ]);

  return (
    <div>
        <Header fio={'Председателев П.П.'} snt={'СНТ1'}/>
        <div className="main_container_user">
            <div className="container_user">
              <div className="headerContent_container_user">
              
              {isAdmin ? <h3>Личный кабинет председателя СНТ</h3> : <h3>Личный кабинет члена СНТ</h3>}                        
              <div className="dropdown_user">Председателев П.П.</div>              
              
              <div className='tabs'><h4 className={isEventsPage ? 'active_tab' : 'inactive_tab'} onClick={(e)=> {e.preventDefault(); setIsEventsPage(true) }}>События</h4> / <h4 className={!isEventsPage ? 'active_tab' : 'inactive_tab'} onClick={(e)=> {e.preventDefault(); setIsEventsPage(false)}}>Архив актов органов</h4></div>
              
              {isAdmin && <button className="btnCreate_user" onClick={(e)=>{e.preventDefault(); navigate('/protocol');}}>+ Создать</button>}
              </div>
              
              {isEventsPage ? <div className="events_container_user">
                <div className="futureEvents_user">
                  <h3 className='nameEventsText_user'>Предстоящие</h3>
                {futureEvents.map((elem)=>{
                 return <EventElem event={elem} key={elem.id}/>
                })}
                </div>
                <div className="pastEvents_user">
                <h3 className='nameEventsText_user'>Прошедшие</h3>
                {pastEvents.map((elem)=>{
                 return <EventElem key={elem.id} event={elem} link={'/user/:id/events'} />
                })}
                </div>
              </div>
                :
              <div className="archive_container_user">
                <div className="futureEvents_user">
                {archiveDocs.map((elem)=>{
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