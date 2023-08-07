import React from 'react'
import styles from './Preloader.css'

const Preloader = () => {
  return (
    <div className={styles.preloader_wrapper}>
      <div className={styles.preloader}>
        <div className={styles.loader}></div>
      </div>
    </div>
  )
}

export default Preloader