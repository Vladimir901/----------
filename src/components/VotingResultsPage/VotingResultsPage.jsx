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
    
    // const [results, setResults] = useState(0)
    // const [zaVotes, setZaVotes] = useState(0)
    // const [protivVotes, setProtivVotes] = useState(0)
    // const [dkVotes, setDKVotes] = useState(0)
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
            // console.log(res.data)   
            if(res.data.type.split(' ')[0]=='очное' || res.data.type.split(' ')[1]=='очное'){
              questions.forEach(question =>{
                let za = Number(document.getElementsByClassName('zaVote_'+question.id)[0].value)
                let protiv = Number(document.getElementsByClassName('protivVote_'+question.id)[0].value)
                let dk = Number(document.getElementsByClassName('dkVote_'+question.id)[0].value)               
                if(za+protiv+dk>Number(localStorage.getItem('peopleInSNT_count'))) {
                  NotificationManager.error("Количество голосов не может быть больше количества членов СНТ.", "Ошибка", 3000)
                  return
                }               
                if(za>(za+protiv+dk)/2+1) NotificationManager.success("Вопрос принят голосованием", "Успешно", 3000)
                else NotificationManager.warning("Вопрос не принят голосованием", "Внимание", 3000)

                //итоги

                var formdata1 = new FormData();
                formdata1.append("yes", za);
                formdata1.append("no", protiv);
                formdata1.append("idk", dk);
                formdata1.append("question", question.question);
                formdata1.append("meeting_id", res.data.id);
                let res1 = axios.put(`http://127.0.0.1:8000/api/quests/${question.id}/`, formdata1) 

              })
            }

            else if(res.data.type.split(' ')[0]=='заочное' || res.data.type.split(' ')[1]=='заочное'){
              
              questions.forEach(question =>{           
                console.log(question)        
                let zaZaoch = Number(question.zaoch_yes)
                let protivZaoch = Number(question.zaoch_no)
                let dkZaoch = Number(question.zaoch_idk)      
                console.log(question.zaoch_yes)        
                console.log(question.zaoch_no)        
                console.log(question.zaoch_idk)        
                console.log(zaZaoch>(zaZaoch+protivZaoch+dkZaoch)/2+1)        
                if(zaZaoch+protivZaoch+dkZaoch>Number(localStorage.getItem('peopleInSNT_count'))) {
                  NotificationManager.error("Количество голосов не может быть больше количества членов СНТ.", "Ошибка", 3000)
                  return
                }               
                if(zaZaoch>(zaZaoch+protivZaoch+dkZaoch)/2+1) NotificationManager.success("Вопрос принят голосованием", "Успешно", 3000)
                else NotificationManager.warning("Вопрос не принят голосованием", "Внимание", 3000)

                //итоги

                // var formdata1 = new FormData();
                // formdata1.append("zaoch_yes", zaZaoch);
                // formdata1.append("zaoch_no", protivZaoch);
                // formdata1.append("zaoch_idk", dkZaoch);
                // formdata1.append("question", question.question);
                // formdata1.append("meeting_id", question.meeting_id);
                // let res1 = axios.put(`http://127.0.0.1:8000/api/quests/${question.id}/`, formdata1)  
                // console.log(res1) 

              })
              
            }
            else {             
              questions.forEach(question =>{
                let za = Number(document.getElementsByClassName('zaVote_'+question.id)[0].value)
                let protiv = Number(document.getElementsByClassName('protivVote_'+question.id)[0].value)
                let dk = Number(document.getElementsByClassName('dkVote_'+question.id)[0].value) 
                axios.get(`http://127.0.0.1:8000/api/meetings/${id}/`)
                .then(res => {               
                  let zaZaoch = Number(res.zaoch_yes)
                  let protivZaoch = Number(res.zaoch_no)
                  let dkZaoch = Number(res.zaoch_idk)             
                if(za+protiv+dk+zaZaoch+protivZaoch+dkZaoch>Number(localStorage.getItem('peopleInSNT_count'))) {
                  NotificationManager.error("Количество голосов не может быть больше количества членов СНТ.", "Ошибка", 3000)
                  return
                }               
                if((za+zaZaoch)>(za+protiv+dk+zaZaoch+protivZaoch+dkZaoch)/2+1) NotificationManager.success("Вопрос принят голосованием", "Успешно", 3000)
                else NotificationManager.warning("Вопрос не принят голосованием", "Внимание", 3000)

                //итоги

                var formdata1 = new FormData();
                formdata1.append("yes", za);
                formdata1.append("no", protiv);
                formdata1.append("idk", dk);
                formdata1.append("zaoch_yes", zaZaoch);
                formdata1.append("zaoch_no", protivZaoch);
                formdata1.append("zaoch_idk", dkZaoch);
                formdata1.append("question", question.question);
                formdata1.append("meeting_id", res.data.id);
                let res1 = axios.put(`http://127.0.0.1:8000/api/quests/${question.id}/`, formdata1)   
              }) 
              })
            }
            NotificationManager.success("Переходим на вкладку с документами...","Выполнено", 5000)
            // setTimeout(()=>{navigate(`/meetingdocs/1`)},5000)   
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

    return (
    <div>
        <Header/>
        <div className="main_container_votingResultsPage">    
          <div className="form_container_votingResultsPage">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className='headerText_votingResultsPage'>Введите результаты голосования собрания</h1>
            <div className="voting_container_votingResultsPage">
            {questions.map(elem=>{
              return <div className="questions_container" key={elem.id}>
              <h3>Вопрос: {elem.question}</h3>
              <div className="questionItem_container"><h4>За</h4><input type='number' className={`zaVote_${elem.id} inputNumber_votingResults`} placeholder='Введите число' {...register(`zaVote_${elem.id}`,{required: true})}/> </div>
              <div className="questionItem_container"><h4>Против</h4><input type='number' placeholder='Введите число' {...register(`protivVote_${elem.id}`,{required: true})} className='inputNumber_votingResults'/></div>
              <div className="questionItem_container"><h4>Воздержался</h4><input type='number' placeholder='Введите число' {...register(`dkVote_${elem.id}`,{required: true})} className='inputNumber_votingResults'/></div>
            </div>
            })}
            </div> 
            {/* <h3>Итоги голосования</h3> */}



            {/* <h4 className='voting_text_votingResultsPage'>1.{id==1 ? "" : ""}
               Утверждение финансово-экономического обоснования взносов на 2023г. финансовый год</h4>
            <h5>За</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('forAnswers_first',{required: 'Введите количество голосов'})}/>
            <h5>Против</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('againstAnswers_first',{required: 'Введите количество голосов'})}/>
            <h5>Воздержались</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('neutralAnswers_first',{required: 'Введите количество голосов'})}/>          
            
            <h4 className='voting_text_votingResultsPage'>2. Утверждение приходно-расходной сметы товарищества на 2023г. финансовый год</h4>
            <h5>За</h5> <input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('forAnswers_second',{required: 'Введите количество голосов'})}/>
            <h5>Против</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('againstAnswers_second',{required: 'Введите количество голосов'})}/>
            <h5>Воздержались</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('neutralAnswers_second',{required: 'Введите количество голосов'})}/>   */}                    
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