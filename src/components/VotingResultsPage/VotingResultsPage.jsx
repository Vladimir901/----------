import React, { useEffect, useState } from 'react'
import './VotingResultsPage.css'
import Header from '../Header/Header'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import axios from 'axios'

function VotingResultsPage() {
    const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])
    const [votedPersList, setVotedPersList] = useState([])
    const {id} = useParams()
    
    useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/api/quests?meeting_id=${id}`)
      .then(res => {
        setQuestions(res.data)
      axios.get(`http://127.0.0.1:8000/api/voted_users?meeting_id=${id}`)
        .then(res1 =>{
          setVotedPersList(res1.data)
        })
      }
      )},[])
      
    const onSubmit = (data) =>{    
      axios.get(`http://127.0.0.1:8000/api/meetings/${id}/`)
          .then(res => {
            let index = 1            
            let array = []
            let hasError = false
            if(res.data.form=='очной'){
              questions.forEach(question =>{
                let za = Number(document.querySelector(`input[name="zaVote_${question.id}"]`).value)
                let protiv = Number(document.querySelector(`input[name="protivVote_${question.id}"]`).value)
                let dk = Number(document.querySelector(`input[name="dkVote_${question.id}"]`).value)  
                let decision = document.querySelector(`textarea[name="decisionVote_${question.id}"]`).value
                if(za+protiv+dk>Number(localStorage.getItem('peopleInSNT_count')) && !hasError) {
                  NotificationManager.error(`Количество голосов в вопросе №${index} не может быть больше количества членов СНТ.`, "Ошибка", 3000)
                index++
                hasError = true
                  return
                }
                let jsonObj = {
                  "meeting_id": id,
                  "question": question.question,
                  "decision": decision,
                  "yes": za,
                  "no": protiv,
                  "idk": dk
                }
                array.push(jsonObj)
                if(!hasError)
                if(za>(za+protiv+dk)/2+1) NotificationManager.success(`Вопрос №${index} принят голосованием`, "Успешно", 3000)
                else NotificationManager.warning(`Вопрос №${index} не принят голосованием`, "Внимание", 3000)
                index++
              })
              if(!hasError){
                let res1 = axios.post(`http://127.0.0.1:8000/docs/decision_data/`, array) 
                console.log(res1)
              }
              DoEventSolved(res)
            }

            else if(res.data.form == 'заочной'){   
              let index = 1    
              let array = []        
              let hasError = false
              questions.forEach(question =>{    
                       
                let zaZaoch = Number(question.zaoch_yes)
                let protivZaoch = Number(question.zaoch_no)
                let dkZaoch = Number(question.zaoch_idk)   
                let decision = document.querySelector(`textarea[name="decisionVote_${question.id}"]`).value  
                if(zaZaoch+protivZaoch+dkZaoch>Number(localStorage.getItem('peopleInSNT_count'))) {
                  NotificationManager.error("Количество голосов не может быть больше количества членов СНТ.", "Ошибка", 3000)
                  index++
                  hasError = true
                  return
                }   
                let jsonObj = {
                  "meeting_id": id,
                  "question": question.question,
                  "decision": decision,
                  "yes": zaZaoch,
                  "no": protivZaoch,
                  "idk": dkZaoch
                }
                array.push(jsonObj)
                if(zaZaoch>(zaZaoch+protivZaoch+dkZaoch)/2+1) NotificationManager.success(`Вопрос №${index} принят голосованием`, "Успешно", 3000)
                else NotificationManager.warning(`Вопрос №${index} не принят голосованием`, "Внимание", 3000)
                index++        
              })
              if(!hasError){
                let res1 = axios.post(`http://127.0.0.1:8000/docs/decision_data/`, array) 
                console.log(res1)
              }
              DoEventSolved(res)
            }

            else {           
              let index = 1      
              let array = []        
              questions.forEach(question =>{
                let za = Number(document.querySelector(`input[name="zaVote_${question.id}"]`).value)
                let protiv = Number(document.querySelector(`input[name="protivVote_${question.id}"]`).value)
                let dk = Number(document.querySelector(`input[name="dkVote_${question.id}"]`).value)    
                let decision = document.querySelector(`textarea[name="decisionVote_${question.id}"]`).value  
                                             
                let zaZaoch = Number(question.zaoch_yes)
                let protivZaoch = Number(question.zaoch_no)
                let dkZaoch = Number(question.zaoch_idk)  

                if(za+protiv+dk+zaZaoch+protivZaoch+dkZaoch>Number(localStorage.getItem('peopleInSNT_count'))) {
                  NotificationManager.error(`Общее количество голосов в вопросе №${index} не может быть больше количества членов СНТ.`, "Ошибка", 3000)
                  index++
                  hasError = true
                  return
                } 
                     
                let jsonObj = {
                  "meeting_id": id,
                  "question": "question",
                  "decision": decision,
                  "yes": za,
                  "no": protiv,
                  "idk": dk
                }    
                
                  array.push(jsonObj)    
                  if(!hasError){           
                  if((za+zaZaoch)>(za+protiv+dk+zaZaoch+protivZaoch+dkZaoch)/2+1) NotificationManager.success(`Вопрос №${index} принят голосованием`, "Успешно", 3000)
                  else NotificationManager.warning(`Вопрос №${index} не принят голосованием`, "Внимание",3000) 
                }                                                                         
                
                index++   
              })
              if(!hasError){
                console.log(array)
                let res1 = axios.post(`http://127.0.0.1:8000/docs/decision_data/`, array, {headers:{'Content-Type': 'application/json'}}) 
                console.log(res1)
              }
              DoEventSolved(res)
            }
           
            if(!hasError)
            {

            NotificationManager.success("Переходим на вкладку с документами...","Выполнено", 5000)
            setTimeout(()=>{navigate(`/meetingdocs/${id}`)},5000) 
            }
          })             
       }
       const DoEventSolved = (res) =>{
          let formdata2 = new FormData();
          formdata2.append("time", res.data.time);
          formdata2.append("date", res.data.date);
          formdata2.append("notification_date", res.data.notification_date);
          formdata2.append("place", res.data.place);
          formdata2.append("type", res.data.type);
          formdata2.append("snt_id", res.data.snt_id);
          formdata2.append("is_solved", true);
          let res2 = axios.put(`http://127.0.0.1:8000/api/meetings/${id}/`, formdata2)
       }

    return (
    <div>
        <Header/>
        <div className="main_container_votingResultsPage">    
          <div className="form_container_votingResultsPage">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='headerText_votingResultsPage'>Введите результаты голосования собрания</h1>
            <div className="voting_container_votingResultsPage">
            {questions.map(elem=>{
              return <div key={elem.id}>
              <h3>Вопрос: {elem.question}</h3>
              <div className="questions_container">
              <div className="questionItem_container"><h4>За</h4><input type='number' name={`zaVote_${elem.id}`} className={` inputNumber_votingResults`} placeholder='Введите число' min={0} max={Number(localStorage.getItem('peopleInSNT_count'))} {...register(`zaVote_${elem.id}`,{required: true})}/> </div>
              <div className="questionItem_container"><h4>Против</h4><input type='number' name={`protivVote_${elem.id}`} placeholder='Введите число' min={0} max={Number(localStorage.getItem('peopleInSNT_count'))} {...register(`protivVote_${elem.id}`,{required: true})} className='inputNumber_votingResults'/></div>
              <div className="questionItem_container"><h4>Воздержался</h4><input type='number' name={`dkVote_${elem.id}`} placeholder='Введите число' min={0} max={Number(localStorage.getItem('peopleInSNT_count'))}{...register(`dkVote_${elem.id}`,{required: true})} className='inputNumber_votingResults'/></div>
              <div className="questionItemText_container"><h4>Решение</h4><textarea name={`decisionVote_${elem.id}`} placeholder='Введите решение' {...register(`decisionVote_${elem.id}`,{required: true})} className='inputTextarea_votingResults'/></div>
              </div>
            </div>
            })}
            </div> 
            {/* <h3>Итоги голосования</h3> */}
                   
            <div className="votingResultsPage_btn_container">
            <input type='submit' className='btn_votingResultsPage' value="Создать протокол и решение"/>
            </div>       
          </form>             
          </div>
        </div>
        {votedPersList.length!=0 && <div className="listPers_container">  
        <h3>Проголосовали заочно</h3>
            <ul>         
              {votedPersList.map((person)=>{
                return <li key={person.id} style={{ listStyleType: 'none'}}>{person.last_name+" "+person.first_name+" "+person.middle_name}</li>
              })}
              </ul>  
            </div>}
    </div>
  )
}

export default VotingResultsPage