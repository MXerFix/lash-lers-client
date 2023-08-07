import classNames from 'classnames'
import React from 'react'
import { ReactDOM } from 'react'
import styles from '../PortfolioCard.css'


interface portfolioModalCardI {
  className?: string
  portfolio_image: string
  portfolio_price: number
  portfolio_bend_type: string
  setModalPortfolioFN: Function
}


export const ModalPortfolio = ({ className, portfolio_bend_type, portfolio_image, portfolio_price, setModalPortfolioFN }: portfolioModalCardI) => {
  return (
    <div className={classNames(styles.modal, className)}>
      <div onClick={(e) => setModalPortfolioFN(false)} className={classNames(styles.wrapper, styles.wrapper_modal)}>
        <div className='w-full h-full'>
          <img className='rounded-xl' src={portfolio_image} alt="" />
        </div>
        <p className={styles.info}> Объем: {portfolio_bend_type} </p>
        <p className={styles.info}> Цена: {portfolio_price}₽ </p>
        <button onClick={(e) => setModalPortfolioFN(false)} className={styles.close_btn}> + </button>
      </div>
    </div>
  )
}
