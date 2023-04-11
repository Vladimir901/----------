import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { Tooltip } from 'react-tooltip'
import axios from 'axios'

import 'react-tooltip/dist/react-tooltip.css' 
import 'react-notifications/lib/notifications.css'
import './MeetingProtocolConstructorPage.css'

import QuestionIcon from '../images/tip.png'
import Header from '../Header/Header'

function MeetingProtocolConstructorPage() {
  const [meetingTypeValue, setMeetingTypeValue] = useState("")
  const [meetingFormValue, setMeetingFormValue] = useState("")
  const [meetingSelectValue, setMeetingSelectValue] = useState("")
  const [newMeetingId, setNewMeetingId] = useState(0)

  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  const navigate = useNavigate()
  const onSubmit = (data) =>{
    if(data)
    {
      var d1 = new Date("2011/02/15 00:00:00")
      var d2 = new Date("2011/02/01 00:00:00")
      var dnow = new Date();
      var dmeet = new Date(data.dateOfMeeting+' '+data.timeOfMeeting)
      
      // if(data.dataOfAlarming!=null) dnow = new Date(data.dataOfAlarming +' '+data.timeOfAlarming)           
      // else {
      //   dnow = new Date()
      //   dnow = dnow.getDate()+" "+dnow.getHours()+":"+dnow.getMinutes()
      // }

      if(Math.abs(dmeet-dnow)<Math.abs(d1-d2)){ 
        NotificationManager.error("Создать уведомление можно не позднее, чем за 2 недели до его начала","Ошибка", 5000)
        return
      }
      var formdata = new FormData();
      //1

      formdata.append("snt_id", localStorage.getItem('snt_id'));
      formdata.append("time", data.timeOfMeeting);
      formdata.append("date", data.dateOfMeeting);
      formdata.append("place", data.placeOfMeeting);     
      formdata.append("notification_date", dnow);     
      formdata.append("type", data.meetingType +" "+ data.meetingForm);     

      let res = axios.post("http://localhost:8000/api/meetings", formdata)
      .then(res=>{
        var formdata1 = new FormData();
        formdata.append("file", data.file);
        formdata.append("name", "Протокол собрания");
        formdata.append("type", "Протокол собрания");
        formdata.append("meeting_id", res.data.id);
        let res1 = axios.post('http://127.0.0.1:8000/upload/', formdata1)
        console.log(res1)
      })

      //2
      // 

      NotificationManager.success("Уведомление успешно создано. Перенаправляем в личный кабинет...","Выполнено", 3000)
      // setTimeout(()=>{navigate(`/user/${localStorage.getItem('user_id')}/events`, { })}, 3000)
    }    
    //reset() сброс данных формы
  }
  console.log(newMeetingId)

  const onChangeSelectValues = (e) => {
    let value = Array.from(e.target.selectedOptions, option => option.value);
    setMeetingSelectValue(value)
  }
  const onMeetingTypeChange = (e) => {
    setMeetingTypeValue(e.target.value)
  }
  const onMeetingFormChange = (e) => {
    setMeetingFormValue(e.target.value)
  }
  const meetingQuestions = [
    {
      value: "Утверждение финансово-экономического обоснования взносов на 2023г. финансовый год", 
      label: "Утверждение финансово-экономического обоснования взносов на 2023г. финансовый год",
    },
    {
      value: "Утверждение расходной сметы товарищества на 2023г. финансовый год", 
      label: "Утверждение расходной сметы товарищества на 2023г. финансовый год",
    },
    {
      value: "Прекращение членства", 
      label: "Прекращение членства",  
    },
    {
      value: "Применение электронных и технических средств", 
      label: "Применение электронных и технических средств",  
    },
    {
      value: "Принятие новых членов в СНТ", 
      label: "Принятие новых членов в СНТ",
    },
    {
      value: "Утверждение приходно-расходной сметы и принятие решения о ее исполнении", 
      label: "Утверждение приходно-расходной сметы и принятие решения о ее исполнении",
    },
  ]
  useEffect(()=>{
    if(meetingTypeValue=="внеочередное" && meetingFormValue=="заочное"){

    }
    else if(meetingTypeValue=="" && meetingFormValue==""){

    }
    
  },[])

  return (
    <div>
        <Header />
      <div className="main_container_mpcPage">     
            <div className="form_container_mpcPage">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='headerText_mpcPage'>Введите данные</h2>
                <h4 className='questionTitle_text'>1. Загрузите протокол заседания правления </h4>
                <div className="meetingDateAndPlace_link">
                  <input type='file' className='uploadFile_btn' {...register("file")}/>
                  <br/>
                  <h4 className='questionTitle_text'>2. По какому поводу проводится собрание? </h4>
                {/* <Select defaultValue={selectedOption} options={meetingQuestions} isSearchable={true} isMulti={true} placeholder="Выберите пункт..." className='meetingDateAndPlace_select'/> */}
                <select multiple={true} className='meetingDateAndPlace_select' {...register('reasonsOfMeeting',{required: true})} onChange={onChangeSelectValues}>
                {meetingQuestions.map((elem)=>{
                 return <option value={elem.value}>{elem.label}</option>
                })}                
                </select>
                  {/* <h4 className='questionTitle_text'>2. Результаты голосования заседания правления</h4>  
                  <input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' value={'Утвердить финансово-экономическое обоснование вносов на 2023г. финансовый год разработанный Правлением СНТ в новой редакции'}/>  
                  <h5>За: 3, Против: 0, Воздержались: 0</h5>
                  <input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' value={'Утвердить приходно- расходную сметы Товарищества на 2023г. финансовый год, разработанный Правлением СНТ в новой редакции'}/>  
                  <h5>За: 2, Против: 1, Воздержались: 0</h5>   
                  <input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' value={'Вынести вопрос о проведении очередного собрания членов СНТ 1 в очной форме по следующим вопросам: А) Утверждение финансово-экономического обоснования взносов на 2023г. финансовый год. Б) Утверждение приходно- расходной сметы товарищества на 2023г. финансовый год'}/>  
                  <h5>За: 3, Против: 0, Воздержались: 0</h5>                */}
                  {/* <h5>За</h5> <input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('forAnswers_second',{required: 'Введите количество голосов'})}/>
            <h5>Против</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('againstAnswers_second',{required: 'Введите количество голосов'})}/>
  <h5>Воздержались</h5><input type='text' className='inputText_votingResultsPage' placeholder='Количество голосов' {...register('neutralAnswers_second',{required: 'Введите количество голосов'})}/> */}         
                <h4 className='questionTitle_text'>3. Вид собрания</h4>
                <div className="meetingContainer_mpcPage">
                <input id='r11' type='radio' name='meetingType_input' className='inputRadio_mpcPage' value={'очередное'} {...register("meetingType")} onChange={onMeetingTypeChange}/>                 
                <label for='r11' >Очередное</label>
                <img src={QuestionIcon} data-tooltip-id="my-r11" data-tooltip-content="" data-tooltip-place="right"/>
                <br/>
                <input id='r12' type='radio' name='meetingType_input' className='inputRadio_mpcPage' value={'внеочередное'} {...register("meetingType")} onChange={onMeetingTypeChange}/> 
                <label for='r12' >Внеочередное</label>
                <img src={QuestionIcon} data-tooltip-id="my-r12" data-tooltip-content="Созывается по требованию: правления, ревизионной комиссии, членов товарищества в количестве более чем одна пятая(1/5) членов товарищества (по требованию органа местного самоуправления)." data-tooltip-place="right"/>
                </div>
                <h4 className='questionTitle_text'>4. Форма проведения</h4>
                <div className="meetingContainer_mpcPage">
                <input id='r21' type='radio' name='meetingForm_input' className='inputRadio_mpcPage' value={'очное'} {...register("meetingForm")} onChange={onMeetingFormChange}/> 
                <label for='r21'>Очная</label>               
                <img src={QuestionIcon} data-tooltip-id="my-r21" data-tooltip-content="Очное собрание проводится в любых случаях и по всем вопросам и предполагает очные обсуждение вопросов повестки собрания и голосование (так называемые «голосования рукой»)." data-tooltip-place="right"/>
                <br/>
                <input id='r22' type='radio' name='meetingForm_input' className='inputRadio_mpcPage' {...register("meetingForm")} value={'заочное'} onChange={onMeetingFormChange}/> 
                <label for='r22'>Заочная</label>
                <img src={QuestionIcon} data-tooltip-id="my-r22" data-tooltip-content="" data-tooltip-place="right"/>
                <br/>
                <input id='r23' type='radio' name='meetingForm_input' className='inputRadio_mpcPage' value={'очно-заочное'} {...register("meetingForm")} onChange={onMeetingFormChange}/> 
                <label for='r23'>Очно-заочная</label>
                <img src={QuestionIcon} data-tooltip-id="my-r23" data-tooltip-content="" data-tooltip-place="right"/>
                </div>
                <h4 className='questionTitle_text'>5. Введите место и время проведения </h4>
                <input  type='date' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Дата' {...register('dateOfMeeting',{required: 'Введите дату встречи'})}/> 
                {errors.dateOfMeeting && <div className='errorText_mpcPage'>{errors?.dateOfMeeting.message}</div>}
                <br/>
                <input  type='time' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Время'{...register('timeOfMeeting',{required: 'Введите время встречи'})}/>
                {errors.timeOfMeeting && <div className='errorText_mpcPage'>{errors?.timeOfMeeting.message}</div>} 
                <br/>
                <input  type='text' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Место' {...register('placeOfMeeting',{required: 'Введите место встречи'})}/> 
                {errors.placeOfMeeting && <div className='errorText_mpcPage'>{errors?.placeOfMeeting.message}</div>} 
                <br/>           
                {/* <h4 className='questionTitle_text'>6. Дата и время оповещения? </h4>
                  <input  type='date' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Дата' {...register('dataOfAlarming',{required: false})}/> 
                  <input  type='time' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Дата' {...register('timeOfAlarming',{required: false})}/>                 */}
                  {/* <Link to={''} onClick={()=>{NotificationManager.info("Функция находится в разработке","Внимание", 3000)}}>У меня нет протокола заседания правления</Link> */}
                </div>              
                <br/>
                <div className="meetingDateAndPlace_btn_container">
                <input type='submit' className='btn_mpcPage' value="Создать уведомление"/>
                </div>
                <Tooltip id='my-r11' className='tooltip'/>
                <Tooltip id='my-r12' className='tooltip'/>
                <Tooltip id='my-r21' className='tooltip'/>
                <Tooltip id='my-r22' className='tooltip'/>
                <Tooltip id='my-r23' className='tooltip'/>
                </form>
            </div>
        </div>
        <div className="leftTips_container">
          <h3 className='headerText_leftTips_container'>Справка</h3>
        <ul>
          <li>Очередное общее собрание созывается Правлением СНТ не реже, чем раз в квартал. 
          <a target="_blank" href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/'> Прим. Если уставом не предусмотрено, то Очередное общее собрание членов товарищества созывается правлением товарищества по мере необходимости, но не реже чем один раз в год (ч. 6 ст. 17 ФЗ -217).</a></li>
          <li>Очное собрание проводится в любых случаях и по всем вопросам и предполагает очные обсуждение вопросов повестки собрания и голосование (так называемые «голосования рукой»).</li>
          <li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/'>Уведомление минимум за 2 недели до проведения собрания обязательно: </a>
          о проведении общего собрания членов товарищества должны быть указаны перечень вопросов, подлежащих рассмотрению на общем собрании членов товарищества, дата, время и место проведения общего собрания членов товарищества, а также способ ознакомления с проектами документов и иными материалами, планируемыми к рассмотрению на общем собрании членов товарищества. Включение в указанный перечень дополнительных вопросов непосредственно при проведении такого собрания не допускается (ч. 15 ст. 17 ФЗ-217).
          </li>
        </ul>
        </div>
        <div className="rightTips_container">
          В разработке
        </div>
      </div>
  )
}

export default MeetingProtocolConstructorPage