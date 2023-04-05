import React, {useRef, useState} from 'react'
import axios from 'axios'
import './RegistrationPage.css'
import Header from '../Header/Header'
import { useForm } from 'react-hook-form'
import { useNavigate, Link, json } from 'react-router-dom'
import { NotificationManager } from 'react-notifications'

function RegistrationPage() {
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  const navigate = useNavigate()
  const onSubmit = (data) =>{
    axios.get("http://localhost:8000/api/users").then(res => res.data.forEach((account) => { 
      if(data.login != account.email) {
        if(data.password === data.password_validation)
          {
            var formdata = new FormData();
            formdata.append("snt_id", 1);
            formdata.append("email", data.login+"");
            formdata.append("password", data.password+"");     
            let res = axios.post("http://localhost:8000/api/users", formdata);
            navigate(`/user/${data.login}/events`)
          }
      }
      else NotificationManager.warning("Аккаунт с таким адресом почты уже есть. Войдите через форму авторизации","Внимание", 3000)
    }
    ))
    //reset() сброс данных формы 
}
  return (
    <div>
        <Header/>
        <div className="main_container_register">
            <div className="form_container_register">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='headerText_register'>Регистрация</h2>
                <h4>Почта</h4>
                <input type='text' className='inputText_register' {...register('login',{required: 'Неверный адрес почты', minLength: {value: 7, message: "Невалидный адрес почты"} })}/>
                {errors?.email && <div className='errorText_register'>Ошибка в адресе почты</div>}
                <h4>Пароль</h4>
                <input type='password' className='inputText_register' {...register('password',{required: 'Пароль не введён'})}/> 
                {errors?.password && <p className='errorText_register'>{errors?.password.message}</p>}
                <h4>Ещё раз пароль</h4>
                <input type='password' className='inputText_register' {...register('password_validation',{required: 'Пароль не введён'})}/>
                {errors?.password_validation && <p className='errorText_register'>{errors?.password_validation.message}</p>}
                <input type='submit' className='btn_register' value="Регистрация"/>
                <Link to={'/auth'}><h6 className='linkToAuth_register'>Уже зарегистрированы?</h6></Link>  
                </form>
            </div>
        </div>
    </div>
  )
}

export default RegistrationPage