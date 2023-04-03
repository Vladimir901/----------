import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css' 
import Header from '../Header/Header'
import './MeetingProtocolConstructorPage.css'
import 'react-notifications/lib/notifications.css'

function MeetingProtocolConstructorPage() {
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  const navigate = useNavigate()
  const onSubmit = (data) =>{
    if(data)
    {
      var d1 = new Date("2011/02/15"); //"now"
      var d2 = new Date("2011/02/01");  // some date
      var dnow =new Date()
      var dmeet = new Date(data.dateOfMeeting)
      if(Math.abs(dmeet-dnow)<Math.abs(d1-d2))
      { NotificationManager.error("Создать уведомление можно не позднее, чем за 2 недели до его начала","Ошибка", 5000)
        return;
      }
      // if(data.dateOfMeeting )
      NotificationManager.success("Уведомление успешно создано","Выполнено", 3000)
      setTimeout(()=>{navigate('/user/1/events', { })},3000)
    }
      
    //alert(JSON.stringify(data.questionsSelection))
    //reset() сброс данных формы
  }
  return (
    <div>
        <Header fio={'Председателев П.П.'} snt={'СНТ1'}/>
      <div className="main_container_mpcPage">     
            <div className="form_container_mpcPage">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='headerText_mpcPage'>Введите данные</h2>
                {/* <Tooltip anchorSelect=".headerText_mpcPage" place="right">Hello world!111111</Tooltip> */}
                <h4 className='questionTitle_text'>1. Вид собрания</h4>
                <div className="meetingTypeContainer_mpcPage">
                <input id='r11' type='radio' name='meetingType_input' className='inputRadio_mpcPage'/> 
                <label for='r11' >Очередное</label>
                <br/>
                <input id='r12' type='radio' name='meetingType_input' className='inputRadio_mpcPage' disabled/> 
                <label for='r12' >Внеочередное</label>
                </div>
                <h4 className='questionTitle_text'>2. Форма проведения</h4>
                <div className="meetingFormContainer_mpcPage">
                <input id='r21' type='radio' name='meetingForm_input' className='inputRadio_mpcPage'/> 
                <label for='r21'>Очная</label>               
                <br/>
                <input id='r22' type='radio' name='meetingForm_input' className='inputRadio_mpcPage' disabled/> 
                <label for='r22'>Заочная</label>
                <br/>
                <input id='r23' type='radio' name='meetingForm_input' className='inputRadio_mpcPage' disabled/> 
                <label for='r23'>Очно-заочная</label>
                </div>
                <h4 className='questionTitle_text'>3. По какому поводу проводится собрание? </h4>
                <select multiple size={3} className='meetingDateAndPlace_select' {...register('questionsSelection',{required: true})}>
                  <option value="Утверждение финансово-экономического обоснования взносов на 2023г. финансовый год" >Утверждение финансово-экономического обоснования взносов на 2023г. финансовый год</option>
                  <option value="Утверждение расходной сметы товарищества на 2023г. финансовый год" >Утверждение расходной сметы товарищества на 2023г. финансовый год</option>
                  <option value="Принятие новых членов в СНТ" disabled>Принятие новых членов в СНТ</option>
                  <option value="Утверждение приходно-расходной сметы и принятие решения о ее исполнении" disabled>Утверждение приходно-расходной сметы и принятие решения о ее исполнении</option>
                </select>
                <h4 className='questionTitle_text'>4. Введите место и время проведения </h4>
                <input  type='date' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Дата' {...register('dateOfMeeting',{required: 'Введите дату встречи'})}/> 
                {errors.dateOfMeeting && <div className='errorText_mpcPage'>{errors?.dateOfMeeting.message}</div>}
                <br/>
                <input  type='time' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Время'{...register('timeOfMeeting',{required: 'Введите время встречи'})}/>
                {errors.timeOfMeeting && <div className='errorText_mpcPage'>{errors?.timeOfMeeting.message}</div>} 
                <br/>
                <input  type='text' name='meetingDateAndPlace_textInput' className='inputText_mpcPage' placeholder='Место' {...register('placeOfMeeting',{required: 'Введите место встречи'})}/> 
                {errors.placeOfMeeting && <div className='errorText_mpcPage'>{errors?.placeOfMeeting.message}</div>} 
                <br/>
                <h4 className='questionTitle_text'>5. Загрузите протокол заседания правления </h4>
                <div className="meetingDateAndPlace_link">
                  <input type='file' className='uploadFile_btn'/>
                  <br/>
                  <Link to={'/votingresults'}>У меня нет протокола заседания правления</Link>
                </div>              
                <br/>
                <div className="meetingDateAndPlace_btn_container">
                <input type='submit' className='btn_mpcPage' value="Создать уведомление"/>
                </div>
                </form>
            </div>
        </div>
      </div>
  )
}

export default MeetingProtocolConstructorPage