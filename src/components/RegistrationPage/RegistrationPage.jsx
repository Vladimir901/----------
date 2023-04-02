import React from 'react'
import './RegistrationPage.css'
import Header from '../Header/Header'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function RegistrationPage() {
  const {register, formState: {errors, isValid}, handleSubmit, reset} = useForm({mode: 'onSubmit'})
  const navigate = useNavigate()
  const onSubmit = (data) =>{
    if(data.password===data.password_validation)
      navigate('/user/1/events')
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
                <input type='text' className='inputText_register' {...register('email',{required: 'Неверный адрес почты', minLength: {value: 7, message: "Невалидный адрес почты"} })}/>
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