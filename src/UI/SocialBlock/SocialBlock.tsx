import React from 'react'
import { socialBlockInterface } from '../../utils/interfaces'
import styles from './socialblock.css'

export const SocialBlock = ({img, href}: socialBlockInterface) => {
  return (
    <a target={'_blank'} href={href} className={styles.socialblock_main}>
      <img src={img} alt="" />
    </a>
  )
}
