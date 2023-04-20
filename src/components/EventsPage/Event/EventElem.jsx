import React, { useRef, useState } from 'react'
import './EventElem.css'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function EventElem(props) {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem('is_admin')))

  const handleClick = () => {
    if(props.event.is_solved){
      // NotificationManager.error(`Собрание уже проведено.`, "Ошибка", 3000)
      navigate(`/user/${localStorage.getItem('user_id')}/events/${props.event.id}`)
      return
    }
    if(JSON.parse(localStorage.getItem('is_verif'))!=true){
      NotificationManager.error(`Необходимо заполнить все поля в личном кабинете.`, "Ошибка", 3000)
      return
    }

    axios.get(`http://127.0.0.1:8000/api/voted_users?meeting_id=${props.event.id}`)
    .then(res => { 
      let hasVoted = false
      if(res.data.length!=0){
        res.data.map(item => {
          if(item.id+"" == localStorage.getItem('user_id')){
            NotificationManager.error(`Вы уже ранее проголосовали на данном собрании. Ожидайте подведения результатов собрания председателем.`, "Ошибка", 5000)
            hasVoted = true
            return
          }     
        })
      }
    if(!hasVoted){
    if(props.event.form!="")
    if(props.event.form.toLowerCase()=="очной"){  
        
    if(isAdmin!=true){
      NotificationManager.info(`Для очного голосования Вам необходимо явиться в ${props.event.date} по адресу ${props.event.place}. Сейчас начнётся загрузка бюллетеня...`, "Внимание", 5000)
      axios.get(`http://127.0.0.1:8000/api/docs?meeting_id=${props.event.id}`)
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
    }
      else {
        navigate(`/votingadmin/${props.event.id}`,{ })
      }
    }
    else if(isAdmin==true)
      navigate(`/votingadmin/${props.event.id}`,{ })
      else 
      navigate(`/votinguser/${props.event.id}`,{ })
    
  }})
   }

  return (
    <div >
      
    <div className={'eventElem addLink3 '+(props.event.is_solved ? "solvedEvents_item" : "futureEvents_item")} onClick={handleClick}>
        <h5>{props.event.type!="" ? props.event.type.toUpperCase().split('').slice(0,-1).join("")+"Е "+props.event.form.toUpperCase().split('').slice(0,-1).join("")+"Е СОБРАНИЕ" : "СОБРАНИЕ"}</h5>
        <div className="inline_info">
        <h6>Начало собрания: <u>{props.event.date}</u></h6>
        <h6>Место проведения собрания: {props.event.place}</h6>
        </div>
    </div>
    </div>
  )
}
export default EventElem