import React from 'react'
import { PriceListItem } from '../../UI/PriceListItem/PriceListItem'
import { REMOVE_LASHES } from '../../utils/consts'
import styles from './PriceListSample.css'

export const PriceListSample = ({ list, title }: {list: any[], title: string}) => {
  return (
    <>
      <h2 className=' mt-4 text-26 text-center '> {title} </h2>
      <ul className={styles.ul_list} >
        {list.map(({ value, price }: {value: string, price: number}) => (
          <PriceListItem key={value} className={title === "Другие услуги" ? 'fz-18' : ''} name={value} price={price} />
        ))}
      </ul>
    </>
  )
}
