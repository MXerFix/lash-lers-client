import React from 'react'
import styles from './PriceListItem.css'
import { priceListItemI } from '../../components/PriceListComponent/PriceListComponent'
import classNames from 'classnames'



export const PriceListItem = ({ name, price, className }: {name: string, price: number, className: string}) => {
  return (
    <li className={classNames(styles.li_list, className)}>
      <h4 className={styles.h_list} > {name} </h4>
      <span className={styles.underline}></span>
      <p className={styles.p_list} > {price}₽ </p>
    </li>
  )
}
