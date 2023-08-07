import React from 'react'
import styles from './FallbackPage.css'

export const FallbackPage = () => {
  return (
    <div className={styles.oops_wrapper}>
      <p>OOOPS...</p>
      <p>THIS IS FALLBACK PAGE</p>
      <p>MESSAGE US IN <a className={styles.support_a} target='_blank' href="https://t.me/maksrdmitr">TELEGRAM</a></p>
    </div>
  )
}
