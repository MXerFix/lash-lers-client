import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom'
import { ActionButton } from '../../UI/ActionButton/ActionButton'
import { ENTRY_ROUTE, WET_EFFECT } from '../../utils/consts'
import { ModalPortfolio } from './ModalPortfolio/ModalPortfolio'
import styles from './PortfolioCard.css'

interface portfolioCardI {
  portfolio_image: string
  portfolio_price: number
  portfolio_bend_type: string
}

export const PortfolioCard = ({ portfolio_image, portfolio_price, portfolio_bend_type }: portfolioCardI) => {

  const [modalPortfolio, setModalPortfolio] = useState(false)
  // const modal_ref = useRef(document.querySelector('#modal_root'))

  const modal_ref = document.querySelector('#modal_root')
  if (!modal_ref) {
    console.log('false')
    return <></>
  }

  // const PortalModal = ReactDOM.createPortal(<ModalPortfolio className={modalPortfolio ? styles.modal_enabled : styles.modal_disabled} portfolio_bend_type={portfolio_bend_type} setModalPortfolioFN={setModalPortfolio} portfolio_image={portfolio_image} portfolio_price={portfolio_price} />, modal_ref)


  return (
    <>
      <div onClick={(e) => setModalPortfolio(true)} className={classNames(styles.wrapper, ' w-11/12 flex flex-col justify-between items-center cursor-pointer')}>
        <div className={styles.img_box}>
          <img className=' rounded-2xl ' src={portfolio_image} alt="" />
        </div>
        <div className='w-full'>
          <p className={`mt-2 text-center px-2 py-1 text-18 w-full bg-red-400 text-white rounded-lg`}> {portfolio_bend_type} </p>
          <div className='flex flex-row items-center justify-center' >
            <p className={`text-18 px-2 py-1 mt-1.5 text-center bg-warmGray-500 mr-1.5 text-white rounded-lg`}> {portfolio_price}₽ </p>
            <NavLink className={`bg-green-400 block text-center text-white w-full px-2 py-1 mt-1.5 text-18 rounded-lg`} to={`../${ENTRY_ROUTE}`} > Записаться </NavLink>
          </div>
        </div>
      </div>
      {/* {PortalModal} */}
    </>
  )
}
