import React, { useEffect, useState } from 'react'
import './VotingUserPage.css'
import Header from '../Header/Header'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import QuestionVotingElem from './QuestionVoting/QuestionVotingElem'
import { useForm } from 'react-hook-form'
import { NotificationManager } from 'react-notifications'

function VotingUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [countPeople, setCountPeople] = useState(localStorage.getItem('peopleInSNT_count'))
  const[questions, setQuestions] = useState([])
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  useEffect(()=>{
    axios.get(`http://127.0.0.1:8000/api/quests?meeting_id=${id}`)
    .then(res => {
      setQuestions(res.data)
    })
  },[])
  const onSubmit = (data) =>{
    questions.forEach((question)=>{
      console.log(data)
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

  return (
    <div>
      <Header/>
    <div className="main_container_votingPage">
        <div className="container_votingPage">
          <h2>Голосование</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
          {questions.map(elem => {             
           return <div className="questions_container" key={elem.id}>
              <h3>Вопрос: {elem.question}</h3>
      <div className="questionItem_container"><h4>За</h4><input type='radio' name={`Vote_${elem.id}`} className={`radio_questionItem`} value={1} {...register(`Vote_${elem.id}`,{required: true})}/> </div>
      <div className="questionItem_container"><h4>Против</h4><input type='radio' name={`Vote_${elem.id}`} className={'radio_questionItem'} value={-1} {...register(`Vote_${elem.id}`,{required: true})}/></div>
      <div className="questionItem_container"><h4>Воздержался</h4><input type='radio' name={`Vote_${elem.id}`} className={`radio_questionItem`} value={0} {...register(`Vote_${elem.id}`,{required: true})}/></div>
            </div>
          })}
          <input type='submit' className='btn_votingPage' value={'Проголосовать'}/>
          </form>
        </div>
    </div>
    </div>
  )
}

export default VotingUserPage