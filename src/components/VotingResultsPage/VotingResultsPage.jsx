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
    const {id} = useParams()
    
    useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/api/quests?meeting_id=${id}`)
      .then(res => {
        setQuestions(res.data)       
                   
      })
    },[])

    const onSubmit = (data) =>{    
      axios.get(`http://127.0.0.1:8000/api/meetings/${id}/`)
          .then(res => {
            let index = 1
            let hasError = false
            if(res.data.type.split(' ')[0]=='очное' || res.data.type.split(' ')[1]=='очное'){
              questions.forEach(question =>{
                let za = Number(document.querySelector(`input[name="zaVote_${question.id}"]`).value)
                let protiv = Number(document.querySelector(`input[name="protivVote_${question.id}"]`).value)
                let dk = Number(document.querySelector(`input[name="dkVote_${question.id}"]`).value)    
                if(za+protiv+dk>Number(localStorage.getItem('peopleInSNT_count')) && !hasError) {
                  NotificationManager.error(`Количество голосов в вопросе №${index} не может быть больше количества членов СНТ.`, "Ошибка", 3000)
                  index++
                  hasError =  true
                  return
                }
                
                else if(!hasError){
                  if(za>(za+protiv+dk)/2+1) NotificationManager.success(`Вопрос №${index} принят голосованием`, "Успешно", 3000)
                  else NotificationManager.warning(`Вопрос №${index} не принят голосованием`, "Внимание", 3000)
                  let formdata1 = new FormData();
                  formdata1.append("yes", za);
                  formdata1.append("no", protiv);
                  formdata1.append("idk", dk);
                  formdata1.append("question", question.question);
                  formdata1.append("meeting_id", res.data.id);
                  let res1 = axios.put(`http://127.0.0.1:8000/api/quests/${question.id}/`, formdata1) 
                  }   
                  index++      
              })
              DoEventSolved(res)
            }

            else if(res.data.type.split(' ')[0]=='заочное' || res.data.type.split(' ')[1]=='заочное'){              
              questions.forEach(question =>{           
                let zaZaoch = Number(question.zaoch_yes)
                let protivZaoch = Number(question.zaoch_no)
                let dkZaoch = Number(question.zaoch_idk)            
                if(zaZaoch+protivZaoch+dkZaoch>Number(localStorage.getItem('peopleInSNT_count'))) {
                  NotificationManager.error("Количество голосов не может быть больше количества членов СНТ.", "Ошибка", 3000)
                  index++
                  hasError = true
                  return
                }       
                index++        
                if(zaZaoch>(zaZaoch+protivZaoch+dkZaoch)/2+1) NotificationManager.success(`Вопрос №${index} принят голосованием`, "Успешно", 3000)
                else NotificationManager.warning(`Вопрос №${index} не принят голосованием`, "Внимание", 3000)
              })
              DoEventSolved(res)
            }

            else {             
              
              questions.forEach(question =>{
                let za = Number(document.querySelector(`input[name="zaVote_${question.id}"]`).value)
                let protiv = Number(document.querySelector(`input[name="protivVote_${question.id}"]`).value)
                let dk = Number(document.querySelector(`input[name="dkVote_${question.id}"]`).value)    
                                             
                let zaZaoch = Number(question.zaoch_yes)
                let protivZaoch = Number(question.zaoch_no)
                let dkZaoch = Number(question.zaoch_idk)  

                if(za+protiv+dk+zaZaoch+protivZaoch+dkZaoch>Number(localStorage.getItem('peopleInSNT_count'))) {
                  NotificationManager.error(`Общее количество голосов в вопросе №${index} не может быть больше количества членов СНТ.`, "Ошибка", 3000)
                  index++
                  hasError =  true
                  return
                }            
                if(!hasError){
                  if((za+zaZaoch)>(za+protiv+dk+zaZaoch+protivZaoch+dkZaoch)/2+1) NotificationManager.success(`Вопрос №${index} принят голосованием`, "Успешно", 3000)
                  else NotificationManager.warning(`Вопрос №${index} не принят голосованием`, "Внимание", 3000)                
                  let formdata1 = new FormData();
                  formdata1.append("yes", za);
                  formdata1.append("no", protiv);
                  formdata1.append("idk", dk);
                  formdata1.append("question", question.question);
                  formdata1.append("meeting_id", res.data.id);
                  let res1 = axios.put(`http://127.0.0.1:8000/api/quests/${question.id}/`, formdata1)   
                  DoEventSolved(res)
                }
                index++
              })
            }
           
            if(!hasError)
            {
            NotificationManager.success("Переходим на вкладку с документами...","Выполнено", 5000)
            setTimeout(()=>{navigate(`/meetingdocs/1`)},5000) 
            }
          })

          // let countVoters = Number(data.forAnswers_first)+Number(data.againstAnswers_first)+Number(data.neutralAnswers_first);
			    // let result = 100*Number(data.forAnswers_first)/(countVoters)>countVoters/2+1;                         
          // if(result) NotificationManager.success("Первый вопрос будет выставлен на обсуждение.","Вопрос №1", 5000)
			    // countVoters = Number(data.forAnswers_second)+Number(data.againstAnswers_second)+Number(data.neutralAnswers_second);
			    // result = 100*Number(data.forAnswers_second)/(countVoters)>countVoters/2+1;  
          // if(result) NotificationManager.success("Второй вопрос будет выставлен на обсуждение.","Вопрос №2",5000)			
			    // NotificationManager.success("Протокол создан успешно","Выполнено", 5000)
			    // NotificationManager.success("Переходим на вкладку с документами...","Выполнено", 5000)
          // setTimeout(()=>{navigate(`/meetingdocs/1`)},5000)                    
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
              <div className="questionItem_container"><h4>За</h4><input type='number' name={`zaVote_${elem.id}`} className={` inputNumber_votingResults`} placeholder='Введите число' {...register(`zaVote_${elem.id}`,{required: true})}/> </div>
              <div className="questionItem_container"><h4>Против</h4><input type='number' name={`protivVote_${elem.id}`} placeholder='Введите число' {...register(`protivVote_${elem.id}`,{required: true})} className='inputNumber_votingResults'/></div>
              <div className="questionItem_container"><h4>Воздержался</h4><input type='number' name={`dkVote_${elem.id}`} placeholder='Введите число' {...register(`dkVote_${elem.id}`,{required: true})} className='inputNumber_votingResults'/></div>
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
    </div>
  )
}

export default VotingResultsPage