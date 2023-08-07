import classNames from 'classnames'
import React from 'react'
import styles from './preloadermini.css'

const PreloaderMini = ({className, color}: {className?: string, color?:string}) => {
  return (
    <div className={styles.preloader}>
      <div style={color ? {borderTopColor: color, borderRightColor: color} : {}} className={classNames(styles.loader, className)}>
        <div style={color ? {borderTopColor: color, borderRightColor: color} : {}} className={styles.loader_mini}>
        </div>
      </div>
    </div>
  )
}

export default PreloaderMini