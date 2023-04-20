import React, { useEffect, useState } from 'react'
import './VotingUserPage.css'
import Header from '../Header/Header'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { NotificationManager } from 'react-notifications'

function VotingUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const[questions, setQuestions] = useState([])
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  const [meetingType,  setMeetingType] = useState("")
  const [meetingDateTime,  setMeetingDateTime] = useState("")
  const monthNames = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня",
  "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
  
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/quests?meeting_id=${id}`)
    .then(res => {
      setQuestions(res.data)
      axios.get(`http://127.0.0.1:8000/api/meetings/${id}/`)
      .then( res1 => {
        setMeetingType(res1.data.type.split("").slice(0,-1).join('')+"го "+res1.data.form.split("").slice(0,-1).join('')+"го")       
        // setMeetingDateTime(res1.data.date.split(["-",'/'])[1])
      })
    })
  },[])

  const onSubmit = (data) =>{
    questions.forEach((question)=>{
      const raw = {
        type: Number(document.querySelector(`input[name="Vote_${question.id}"]:checked`).value),
        question_id: question.id,
        user_id: localStorage.getItem("user_id")
      }
      let res1 = axios.post('http://127.0.0.1:8000/api/votes', raw)
    })
    
    NotificationManager.success("Голосование прошло успешно. Переводим на главную страницу...", "Успешно",3000)
    setTimeout(()=> {
      navigate(`/user/${localStorage.getItem('user_id')}/events`)
    },3000) 
  }
  const clickHandle = () =>{
    axios.get(`http://127.0.0.1:8000/api/docs?meeting_id=${id}`)
      .then(res => {
        console.log(res.data)
        axios.get(res.data[0].download_link, {responseType: 'blob'})
        .then(blob => {
          const url = window.URL.createObjectURL(
          new Blob([blob.data],{type: "octet/stream"}),
        );
        const link = document.createElement('a');
        link.href = url;
        link.style = 'display: none'
        link.download = "Файлы.zip"
        link.click();
      })
      })
      navigate(-1)
  }
  return (
    <div>
      <Header/>
    <div className="main_container_votingPage">
        <div className="container_votingPage">
          <h2 style={{textAlign:'center', margin: '1%'}}>Бюллетень</h2>
          <h4 style={{textAlign:'center', marginBottom: '2%'}}>голосования члена садоводческого некоммерческого товарищества {localStorage.getItem('snt_name')} на очередном общем собрании членов СНТ {localStorage.getItem('snt_name')}, проводимого {meetingDateTime} в форме {meetingType} голосования</h4>
          {meetingType.split(" ")[1]=="очно-заочного" && <button on onClick={clickHandle}>Скачать документы для голосования в очном формате</button>}
          {/* <h4>Срок окончания приема бюллетеней заочного голосования: {meetingDateTime}</h4> */}
          <h4>ФИО члена СНТ {localStorage.getItem('snt_name')}: {localStorage.getItem('user_fio')}</h4>
          {/* <div className="docs_votingPage">
            <h4>Документы для ознакомления:</h4>
            <div className="linksToDocs_votingPage">
              <a target='_blank' href='http://127.0.0.1:8000/download/20/'>Проект финансово-экономического обоснования размера сборов и размера платы</a>
              <br/>
              <a target='_blank' href='http://127.0.0.1:8000/download/21/'>Проект приходно-расходной сметы СНТ</a>
            </div>
          </div> */}
          <form onSubmit={handleSubmit(onSubmit)} className='form_scroll'>
          {questions.map(elem => {             
           return <div className="questions_container" key={elem.id}>
              <h3 style={{marginBottom:'5px',marginTop:'5px'}}>Вопрос: {elem.question}</h3>
      <div className="questionItem_votingPage"><h4>За</h4><input type='radio' name={`Vote_${elem.id}`} className={`radio_questionItem`} value={1} {...register(`Vote_${elem.id}`,{required: true})}/> </div>
      <div className="questionItem_votingPage"><h4>Против</h4><input type='radio' name={`Vote_${elem.id}`} className={'radio_questionItem'} value={-1} {...register(`Vote_${elem.id}`,{required: true})}/></div>
      <div className="questionItem_votingPage"><h4>Воздержался</h4><input type='radio' name={`Vote_${elem.id}`} className={`radio_questionItem`} value={0} {...register(`Vote_${elem.id}`,{required: true})}/></div>
            </div>
          })}
          <div className="btn_container_votingPage">
          <input type='submit' className='btn_votingPage' value={'Проголосовать'}/>
          </div>
          </form>
        </div>
    </div>
    </div>
  )
}

export default VotingUserPage