import React, { useEffect, useState } from 'react'
import './SolvedEventInfoPage.css'
import Header from '../Header/Header'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function SolvedEventInfoPage() {
  const {id, meeting_id} = useParams()
  const [questions, setQuestions] = useState([])
  const [decisions, setDecisions] = useState([])
  const [meetingTypeAndForm, setMeetingTypeAndForm] = useState('')
  const [meetingPlace, setMeetingPlace] = useState('')
  const [meetingDateTime, setMeetingDateTime] = useState('')
  const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
  "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]

  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/meetings/${meeting_id}/`)
    .then(res => {
      setMeetingTypeAndForm(res.data.type.split('').slice(0,-1).join("")+"е " + res.data.form.split('').slice(0,-1).join("")+"е")
      setMeetingPlace(res.data.place)
      setMeetingDateTime(res.data.date)
      axios.get(`http://127.0.0.1:8000/api/quests?meeting_id=${meeting_id}`)
      .then(res1 => {
        setQuestions(res1.data)//http://127.0.0.1:8000/api/meetings?is_solved=0
      })
    })
  },[])
  return (
    <div>
      <Header/>
      <div className="main_container_solvedEventPage">
        <div className="container_solvedEventPage">
          <h1 style={{textAlign:"center", marginBottom:'2%'}}>Информация о завершённом собрании</h1>
            <h3>Тип и форма проведения: <u><i>{meetingTypeAndForm}</i></u></h3>
            <h3>Дата и время проведения: <u><i>{meetingDateTime}</i></u></h3>
            <h3>Место проведения: <u><i>{meetingPlace}</i></u></h3>
            <h3>Вопросы, поднятые на собрании:</h3>
            <ul>
            {questions.map((elem)=>{
              return <li key={elem.id}>{elem.question}</li>
            })}
            </ul>
            <a className='downloadFilesLink_solvedEventPage' href={`http://127.0.0.1:8000/docs/download/${meeting_id}`}>Скачать документы</a>
            {/* <h3>Вопросы, принятые на собрании:</h3>
            <ul>
            {decisions.map((elem)=>{
              return <li key={elem.id}>{elem.question}</li>
            })}
            </ul> */}
            <div className="link_container_solvedEventPage">
            <Link to={`/user/${id}/events`}>Вернуться к событиям</Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SolvedEventInfoPage