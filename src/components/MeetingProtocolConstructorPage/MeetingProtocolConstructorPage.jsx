import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { Tooltip } from 'react-tooltip'
import axios from 'axios'
import {meetingQuestions} from './meetingQuestionsData'

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
  const [leftTipText, setLeftTipText] = useState("Здесь появятся подсказки")
  const [rightTipText, setRightTipText] = useState("Здесь появятся подсказки")
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  const navigate = useNavigate()
  const onSubmit = (data) =>{
    if(data)
    {
      if(data.file.length==0){
        NotificationManager.error("Не загружен протокол заседания правления.","Ошибка", 3000)
        return
      }
      // let d1 = new Date("2011/02/15 00:00:00")
      // let d2 = new Date("2011/02/01 00:00:00")
      // let dnow = new Date()
      // let dmeet = new Date(data.dateOfMeeting+' '+data.timeOfMeeting)

      // if(Math.abs(dmeet-dnow)<Math.abs(d1-d2)){ 
      //   NotificationManager.error("Создать уведомление можно не позднее, чем за 2 недели до его начала","Ошибка", 5000)
      //   return
      // }
      // let formdata = new FormData();
      // formdata.append("snt_id", localStorage.getItem('snt_id'));
      // formdata.append("time", data.timeOfMeeting);
      // formdata.append("date", data.dateOfMeeting);
      // formdata.append("place", data.placeOfMeeting);     
      // formdata.append("notification_date", dnow);     
      // formdata.append("type", data.meetingType +" "+ data.meetingForm);     
      // let res = axios.post("http://localhost:8000/api/meetings", formdata)

      // .then(res=>{
        let formdata = new FormData();
        formdata.append("snt_id", localStorage.getItem('snt_id'));
        let res = axios.post('http://127.0.0.1:8000/api/meetings', formdata)
        .then(res1 => {
          let formdata1 = new FormData();
          formdata1.append("file", data.file[0]);
          formdata1.append("name", "Протокол_заседания_правления");
          formdata1.append("type", "Протокол_заседания_правления");
          formdata1.append("meeting_id", res1.data.id);
          let res2 = axios.post('http://127.0.0.1:8000/upload/', formdata1)
        })
        
        
      

        // data.reasonsOfMeeting.forEach((reason)=> {
        //   const raw = {
        //     meeting_id: res.data.id,
        //     question: reason
        //   }
        //   let res2 = axios.post('http://127.0.0.1:8000/api/quests', raw)
          
        // }) 

        NotificationManager.success("Уведомление успешно создано. Перенаправляем в личный кабинет...","Выполнено", 3000)
        setTimeout(()=>{navigate(`/user/${localStorage.getItem('user_id')}/events`, { })}, 3000)    
      } 
    }    
    //reset() сброс данных формы
  

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
  const ChangeLeftTip = () =>{
    if(meetingTypeValue=="очередное" && meetingFormValue == "очное"){
      setLeftTipText("<ul><li>Очередное общее собрание созывается Правлением СНТ не реже, чем раз в квартал. <a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/'> Прим. Если уставом не предусмотрено, то Очередное общее собрание членов товарищества созывается правлением товарищества по мере необходимости, но не реже чем один раз в год (ч. 6 ст. 17 ФЗ -217).</a></li><li>Очное собрание проводится в любых случаях и по всем вопросам и предполагает очные обсуждение вопросов повестки собрания и голосование (так называемые «голосования рукой»).</li><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/'>Уведомление минимум за 2 недели до проведения собрания обязательно: </a>о проведении общего собрания членов товарищества должны быть указаны перечень вопросов, подлежащих рассмотрению на общем собрании членов товарищества, дата, время и место проведения общего собрания членов товарищества, а также способ ознакомления с проектами документов и иными материалами, планируемыми к рассмотрению на общем собрании членов товарищества. Включение в указанный перечень дополнительных вопросов непосредственно при проведении такого собрания не допускается (ч. 15 ст. 17 ФЗ-217).</li></ul>")
    }
    else if(meetingTypeValue=="внеочередное" && meetingFormValue == "очно-заочное"){
      setLeftTipText("<ul><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/?ysclid=lg2fcu7ju5368769407'>Внеочередное собрание должно проводить по требованию: правления, ревизионной комиссии, членов товарищества (ч. 7 ст. 17 ФЗ-217). Оно так же может проводить по требованию органов местного самоуправления по месту нахождения СНТ (ч. 8 ст. 17 ФЗ-217).</a></li><li>Очно-заочное: проводится по любым вопросам, если очное собрание не набрало кворум, то есть нужное количество участников собрания. Кворум считается собранным (состоявшимся) в случае, если количество участников собрания равно или меньше половины всех членов СНТ.</li><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/?ysclid=lg2fcu7ju5368769407'>Результаты очно-заочного голосования при принятии решений общим собранием членов определяются совокупностью результатов голосования в очной форме и результатов голосования, направивших до проведения общего собрания членов товарищества свои решения в письменной форме.</a> (ч. 24 ст. 17 ФЗ-217)</li></ul>")
    }
    else setLeftTipText("Здесь появятся подсказки")
  }
  const ChangeRightTip = () => {
    if(meetingTypeValue=="очередное" && meetingFormValue == "очное"){      
      setRightTipText("<ul><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/3615287e918e808a3f6c234928594ab023cc52f8/'>Размер взносов определяется на основании приходно-расходной сметы товарищества и финансово-экономического обоснования, утвержденных общим собранием членов товарищества (ч. 8 ст. 14 ФЗ-217).</a></li> <li>Правление товарищества обязано обеспечить возможность ознакомления с проектами документов и иными материалами, планируемыми к рассмотрению <a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/'>на общем собрании членов товарищества, не менее чем за семь дней до даты проведения общего собрания членов товарищества, в том числе с проектом приходно-расходной сметы,</a> если вопрос будет рассмотрен на повестке. В случае нарушения срока, рассмотрение указанных проектов документов и иных материалов на общем собрании членов товарищества не допускается (ч. 17 ст. 17 ФЗ-217).</li><li>	К полномочиям правления товарищества относятся: <a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/7c5fd1a7648e67d13b83633e60ac17c7be793d4c/'>составление приходно-расходных смет и отчетов правления товарищества и представление их на утверждение общему собранию членов товарищества и подготовка финансово-экономического обоснования</a> размера взносов, вносимых членами товарищества, и размера платы  (п. 9, п. 15 ч. 7  ст. 18 ФЗ-217).</li><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/7c5fd1a7648e67d13b83633e60ac17c7be793d4c/'>Приходно-расходная смета товарищества, составляемая правлением товарищества, должна содержать указание на размер предполагаемых доходов и расходов товарищества,</a> перечень предполагаемых мероприятий и ответственных за их обеспечение должностных лиц товарищества. (ч. 9 ст. 18 ФЗ-217).</li><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/7c5fd1a7648e67d13b83633e60ac17c7be793d4c/'>Приходно-расходная смета может составляться на календарный год или на иной срок, во время которого предполагается осуществление мероприятий, требующих расходов товарищества (ч.10 ст. 18 ФЗ-217).</a></li></ul>")
    }
    else 
    if(meetingTypeValue=="внеочередное" && meetingFormValue == "очно-заочное"){
      setRightTipText("<ul><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/aefc2fb6327707538626dbc148e8676875f68cf6/'>Прекращение членства может быть как добровольным, так и принудительным либо в связи со смертью (ч. 1 ст. 13 ФЗ -217). Добровольное прекращение членства в связи с выходом из товарищества прекращается со дня подачи членом товарищества соответствующего заявления в правление товарищества (ч.3 ст. 13 ФЗ-217). Членство в товариществе прекращается принудительно решением общего собрания членов товарищества со дня принятия такого решения (ч. 4 ст. 13 ФЗ-217). В связи с прекращением у члена товарищества прав на земельный участок или вследствие смерти члена товарищества членство в товариществе прекращается в день наступления соответствующего события (ч. 9 ст. 13 ФЗ-217).</a></li><li>Законом предусмотрено, что <a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/aefc2fb6327707538626dbc148e8676875f68cf6/'>основанием для исключения из членства наличие задолженности за 2 и более расчетных периода</a> (согласно уставу общества, периоды оплаты взносов) (ч. 4 ст. 13 ФЗ-217). Уставом предусмотрены и иные основания для исключения: - прямое и неоднократное нарушение устава; - неоднократное нарушение общественного порядка; - разведение птиц и иных животных.</li><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/aefc2fb6327707538626dbc148e8676875f68cf6/'>Прежде чем исключить члена из Товарищества председатель должен не позднее чем за месяц до дня проведения общего собрания членов товарищества, на котором планируется рассмотреть вопрос об исключении члена товарищества, направляет данному члену товарищества уведомление в форме предупреждение (заказное письмо с уведомлением и описью вложения с основанием об исключении) о возможном исключении из Общества</a> (ч. 5 ст. 13 ФЗ-217).</li><li>Необходимо направить уведомление о проведении собрания, на котором будет стоять вопрос об исключении лица из членов товарищества (<b>заказное письмо с уведомлением и описью вложения по почте</b>).</li><li>К протоколу прикладывается список исключенных является положением к протоколу.</li><li>Если лицо/ (лиц) исключили из членов СНТ, то необходимо направить дополнительное уведомление об исключении из товарищества (вложение протокол и список).</li><li>К исключительной компетенции общего собрания членов товарищества относятся: <a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/'>принятие решения о возможности применения электронных или иных технических средств при принятии решений общим собранием членов товарищества и включении в устав товарищества перечня вопросов, указанных в части 2 статьи 8 </a>  ФЗ-217 (п. 25 ч. 1 ст. 17 ФЗ-217).</li><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/30055b8a10b81f4fc78c964ba5f0d43f4e711d3e/'>Очное голосование, очно-заочное голосование или заочное голосование может быть проведено с применением электронных или иных технических средств</a>  с учетом особенностей, установленных <a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_422253/3af5b6e0b64c575939c9124d4cf2e12e3d88135f/#dst100718'>статьей 17.1</a> ФЗ-217 (ч. 21.1 ст. 17 ФЗ-217).</li><li><a target='_blank' href='https://www.consultant.ru/document/cons_doc_LAW_221173/3af5b6e0b64c575939c9124d4cf2e12e3d88135f/'>Ознакомьтесь с особенностями принятия решений общего собрания членов товарищества с применением электронных или иных технических средств предусмотрены статьей 17.1 ФЗ-217.</a></li></ul>")
    }
    else setRightTipText("Здесь появятся подсказки")
  }

  useEffect(()=>{
    ChangeLeftTip()
    ChangeRightTip()
  },[meetingTypeValue, meetingFormValue])

  return (
    <div>
        <Header />
      <div className="main_container_mpcPage">     
            <div className="form_container_mpcPage">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <h2 className='headerText_mpcPage'>Введите данные</h2> */}
                <h2 className='questionTitle_text' style={{textAlign: "center"}}>Загрузите протокол заседания правления </h2>
                {/* <div className="meetingDateAndPlace_link"> */}
                  <input type='file' className='uploadFile_btn' style={{marginTop: "3%"}} {...register("file")}/>
                  <br/>
                  {/* <h4 className='questionTitle_text'>2. По какому поводу проводится собрание? </h4>
                <select multiple={true} className='meetingDateAndPlace_select' {...register('reasonsOfMeeting',{required: true})} onChange={onChangeSelectValues}>
                {meetingQuestions.map((elem, index)=>{
                 return <option key={index} value={elem.value}>{elem.label}</option>
                })}                
                </select>       
                <h4 className='questionTitle_text'>3. Вид собрания</h4>
                <div className="meetingContainer_mpcPage">
                <input id='r11' type='radio' name='meetingType_input' className='inputRadio_mpcPage' value={'очередное'} {...register("meetingType")} onChange={onMeetingTypeChange}/>                 
                <label htmlFor='r11' >Очередное</label>
                <br/>
                <input id='r12' type='radio' name='meetingType_input' className='inputRadio_mpcPage' value={'внеочередное'} {...register("meetingType")} onChange={onMeetingTypeChange}/> 
                <label htmlFor='r12' >Внеочередное</label>
                </div>
                <h4 className='questionTitle_text'>4. Форма проведения</h4>
                <div className="meetingContainer_mpcPage">
                <input id='r21' type='radio' name='meetingForm_input' className='inputRadio_mpcPage' value={'очное'} {...register("meetingForm")} onChange={onMeetingFormChange}/> 
                <label htmlFor='r21'>Очная</label>               
                <br/>
                <input id='r22' type='radio' name='meetingForm_input' className='inputRadio_mpcPage' {...register("meetingForm")} value={'заочное'} onChange={onMeetingFormChange}/> 
                <label htmlFor='r22'>Заочная</label>
                <br/>
                <input id='r23' type='radio' name='meetingForm_input' className='inputRadio_mpcPage' value={'очно-заочное'} {...register("meetingForm")} onChange={onMeetingFormChange}/> 
                <label htmlFor='r23'>Очно-заочная</label>
                </div>
                <h4 className='questionTitle_text'>5. Введите место и время проведения </h4>
                <input type='date' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Дата' {...register('dateOfMeeting',{required: 'Введите дату встречи'})}/> 
                {errors.dateOfMeeting && <div className='errorText_mpcPage'>{errors?.dateOfMeeting.message}</div>}
                <br/>
                <input type='time' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Время'{...register('timeOfMeeting',{required: 'Введите время встречи'})}/>
                {errors.timeOfMeeting && <div className='errorText_mpcPage'>{errors?.timeOfMeeting.message}</div>} 
                <br/>
                <input type='text' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Место' {...register('placeOfMeeting',{required: 'Введите место встречи'})}/> 
                {errors.placeOfMeeting && <div className='errorText_mpcPage'>{errors?.placeOfMeeting.message}</div>} 
                <br/>           
                </div>              
                <br/> */}
                <div className="meetingDateAndPlace_btn_container">
                <input type='submit' className='btn_mpcPage' value="Создать уведомление"/>
                </div>
                </form>
            </div>
        </div>
        {/* <div className="leftTips_container">
          <h3 className='headerText_leftTips_container'>Справка по типу и форме собрания</h3>
          <div dangerouslySetInnerHTML={{__html: leftTipText}}></div>      
        </div>
        <div className="rightTips_container">
          <h3 className='headerText_rightTips_container'>Справка по вопросам собрания</h3>
          <div dangerouslySetInnerHTML={{__html: rightTipText}}></div>
        </div> */}
      </div>
  )
}

export default MeetingProtocolConstructorPage