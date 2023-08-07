import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../api/auth'
import { AlertModal } from '../../components/AlertModal/AlertModal'
import { FootMenu } from '../../components/FootMenu/FootMenu'
import Preloader from '../../components/Preloader/Preloader'
import PreloaderMini from '../../components/PreloaderMini/PreloaderMini'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { validatePhone } from '../../helpers/validatePhone'
import { store } from '../../store/store'
import { loginUser, UserType } from '../../store/UserStore'
import { ERROR_ALERT, FETCH_TIMEOUT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import styles from './Auth.css'

export const Auth = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tel, setTel] = useState('+7')
  const [error, setError] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState('')

  const errorHandler = (code: number) => {
    switch (code) {
      case 1: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 2: return {
        message: errorMessage,
        alertType: WARNING_ALERT
      }
      case 400: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
    }
    return {
      message: '',
      alertType: ''
    }
  }
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const click = async () => {
    setIsLoading(prev => true);
    setTimeout(async () => {
      if (password.length >= 8 && tel.length >= 12 && validatePhone(tel)) {
        try {
          await auth(name, password, email, tel).then((userData: any) => {
            dispatch(loginUser({ name: userData.name, email: userData.email, tel: userData.tel, role: userData.role, id: userData.id }))
          }).then(() => navigate('../profile'))
        } catch (error: AxiosError | any) {
          console.log(error)
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
        } finally {
          setIsLoading(prev => false)
        }
      } else if (tel.length < 12 || !validatePhone(tel)) {
        setErrorMessage('Неверный формат номера телефона')
        errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        setIsLoading(prev => false)
      } else if (password.length < 8) {
        setErrorMessage('Возможно введенный пароль короче 8-ми символов')
        errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        setIsLoading(prev => false)
      }
    }, FETCH_TIMEOUT);
  }


  // const modal_root = document.querySelector('#modal_root')
  // if (!modal_root) return <></>
  // const PreloaderPortal = ReactDOM.createPortal(<Preloader />, modal_root)

  // if (isLoading) return (
  //   <>
  //     {PreloaderPortal}
  //   </>
  // )

  return (
    <div className='relative flex flex-col items-center'>
      {error != 0 && <AlertModal alertType={errorHandler(error).alertType} > {errorHandler(error).message} </AlertModal>}
      <form className={styles.auth_wrapper}>
        <div className={styles.auth_box}>
          <label htmlFor="">
            Ваше имя (only for registration)
          </label>
          <input autoComplete='name' value={name} onChange={(e) => setName(e.target.value)} className={styles.input} type="name" />
        </div>
        <div className={styles.auth_box}>
          <label htmlFor="">
            Email
          </label>
          <input autoComplete='email' value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} type="email" />
        </div>
        <div className={styles.auth_box}>
          <label htmlFor="">
            Номер телефона *
          </label>
          <input autoComplete='tel' value={tel} onChange={(e) => setTel(e.target.value)} className={styles.input} type="tel" />
        </div>
        <div className={styles.auth_box}>
          <label htmlFor="">
            Пароль *
          </label>
          <input autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} type="password" name="" id="" />
        </div>
        <button onClick={(e) => { e.preventDefault(); click(); }} className='flex flex-col items-center mt-2 bg-333 text-white py-3 px-6 rounded-lg w-28 '> {isLoading ? <PreloaderMini className='w-6 h-6' /> : "Войти"} </button>
        <div className='text-10 text-center text-neutral-400 my-2'>
          <p> Hажимая кнопку вы соглашаетесь с <a className='underline' target='_blank' href="https://web-project-studio.ru/additions/policy.html">политикой хранения и обработки персональных данных</a> </p>
          <p> Bсе данные хранятся и обрабатываются в соответствии с требованиями <a className='underline' href='https://www.consultant.ru/document/cons_doc_LAW_61801/' target="_blank"> Федерального закона "О персональных данных" от 27.07.2006 N 152-ФЗ * </a></p>
        </div>
      </form>
    </div>
  )
}
