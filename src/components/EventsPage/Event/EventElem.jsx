import React, { useRef, useState } from 'react'
import './EventElem.css'
import { Link, useNavigate } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import axios from 'axios'

function EventElem(props) {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem('is_admin')))

  const handleClick = ()=>{
    if(props.event.is_solved){
      NotificationManager.error(`Собрание уже проведено.`, "Ошибка", 3000)
      return
    }
    if(JSON.parse(localStorage.getItem('is_verif'))!=true){
      NotificationManager.error(`Необходимо заполнить все поля в личном кабинете.`, "Ошибка", 3000)
      return
    }

    // let dnow = new Date()
    // let dmeet = new Date(props.event.datetime)
    
    if((props.event.type.toLowerCase().split(" ")[0]=="очное" || props.event.type.toLowerCase().split(" ")[1]=="очное")){  
        
    if(isAdmin!=true)
    {console.log("ff")
      NotificationManager.info(`Для очного голосования Вам необходимо явиться ${props.event.date+" "+props.event.time} по адресу ${props.event.place}. Сейчас начнётся загрузка бюллетеня...`, "Внимание", 5000)
      axios.get('http://127.0.0.1:8000/download/8/', {responseType: 'blob'})
      .then(blob => {
        console.log(blob.data)
          const url = window.URL.createObjectURL(
          new Blob([blob.data],{type: "octet/stream"}),
        );
        const link = document.createElement('a');
        link.href = url;
        link.style = 'display: none'
        link.download = "Бюллетень.docx"
        link.click();
      })}
      else {
        navigate(`/votingadmin/${props.event.id}`,{ })
      }
    }
    else 
    // if(props.event.type.toLowerCase().split(" ")[0]=="заочное" || props.event.type.toLowerCase().split(" ")[1]=="заочное")
    {     
      
    if(isAdmin==true)
      navigate(`/votingadmin/${props.event.id}`,{ })
      else 
      navigate(`/votinguser/${props.event.id}`,{ })
    }
   }//+props.event.id
  //  console.log(props.event)
  return (
    <div >
      
    <div className={'eventElem addLink3'} onClick={handleClick}>
        <h5>{props.event.type.split(' ')[0].toUpperCase()+" "+props.event.type.split(' ')[1].toUpperCase()+" СОБРАНИЕ"}</h5>
        <div className="inline_info">
        <h6>Начало собрания: {props.event.date+" "+props.event.time}</h6>
        <h6>Место проведения собрания: {props.event.place}</h6>
        </div>
    </div>
    </div>
  )
}

export default EventElem