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
          { 
            localStorage.setItem('user_id', res1.data.id)
            localStorage.setItem('user_fio', res1.data.last_name+" "+res1.data.first_name+" "+res1.data.middle_name)
            localStorage.setItem('user_fio_short',res1.data.last_name+" "+res1.data.first_name.split('')[0]+"."+res1.data.middle_name.split('')[0]+".")
            localStorage.setItem('login',res1.data.email)
            localStorage.setItem('password',res1.data.password)
            localStorage.setItem('snt_id',res1.data.snt_id)
            localStorage.setItem('is_gover', res1.data.is_gover)
            localStorage.setItem('is_admin',res1.data.is_admin)
            localStorage.setItem('is_verif', res1.data.is_verif)

            axios.get(`http://localhost:8000/api/snt`)
            .then(res2 => res2.data.forEach((item)=>{
              if(res1.data.snt_id==item.id){
                localStorage.setItem('snt_name',item.name)
                navigate(`/user/${res1.data.id}/events`) 
              }
            }))
          }
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