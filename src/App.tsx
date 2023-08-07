import React, { useEffect, useState } from 'react'
import styles from './App.css'
import './main.global.css'
import { AppRouter } from './components/AppRouter'
import { Header } from './components/Header/Header'
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import './style.css';
import { check } from './api/auth'
import { loginUser, UserType } from './store/UserStore'
import Preloader from './components/Preloader/Preloader'

export const App = () => {

  const dispatch = useDispatch()


  // const [isLoading, setIsLoading] = useState(true)

  // if (isLoading) return <Preloader />


  return (
    <>
      <header className='header'>
        <Header />
      </header>
      <div className='main'>
        <AppRouter />
      </div>
    </>
  )
}
