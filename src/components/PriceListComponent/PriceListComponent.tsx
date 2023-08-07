import React from 'react'
import { PriceListItem } from '../../UI/PriceListItem/PriceListItem'
import { REMOVE_LASHES } from '../../utils/consts'
import { PriceListSample } from '../PriceListSample/PriceListSample'
import styles from './PriceListComponent.css'

interface priceListItemI {
  title: string
  lashes: any[]
  className?: string
}

interface priceListI {
  priceList: priceListItemI[]
}

export type {
  priceListItemI, priceListI
}

export const PriceListComponent = ({ priceList }: priceListI) => {
  return (
    <>
      {priceList.map((list) => {
        
        return (
          <PriceListSample key={list.title} list={list.lashes.sort((currLash, prevLash) => currLash.price - prevLash.price)} title={list.title} />
        )
      })}
    </>
  )
}
