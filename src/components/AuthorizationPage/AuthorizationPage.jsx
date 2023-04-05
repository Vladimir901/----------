import React, { useEffect } from 'react'
import './AuthorizationPage.css'
import Header from '../Header/Header'
import { useNavigate ,Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'

function AuthorizationPage() {
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  const navigate = useNavigate()
  const onSubmit = (data) =>{
    if(data)
    {  
    axios.get("http://localhost:8000/api/users")
    .then(res => res.data.forEach((account) => 
    { 
      if(data.login == account.email)
      {
        axios.get(`http://localhost:8000/api/users/${data.login}/`)
        .then(res1 => {
          if(data.password == res1.data.password)
          { navigate(`/user/${res1.data.id}/events`) }
         else NotificationManager.error("Введён неверный пароль", "Ошибка", 3000)})        
      }
    })) 
    }    
    //reset() сброс данных формы ${data.login}/${data.password}
  }
  return (
    <div>
        <Header/>
        <div className="main_container_auth">
            <div className="form_container_auth">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='headerText_auth'>Вход</h2>
                <h4>Логин</h4>
                <input type='text' className='inputText_auth' {...register('login',{required: 'Введите логин', minLength: {value: 7, message: "Неверный логин"} })}/>
                {errors?.login && <div className='errorText_auth'>'Ошибка в адресе почты'</div>}
                <h4>Пароль</h4>
                <input type='password' className='inputText_auth' {...register('password',{required: 'Введите пароль'})}/>
                {errors?.password && <p className='errorText_auth'>{errors?.password.message}</p>}
                <input type='submit' className='btn_auth' value="Вход"/>

                <Link to={'/register'}><h6 className='linkToRegister_auth'>Ещё не зарегистрированы?</h6></Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default AuthorizationPage