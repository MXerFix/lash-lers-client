import classNames from 'classnames'
import React from 'react'
import styles from './socialsupportlink.css'

interface supportLinkI {
  href: string
  image_icon: string
  social_name: string
}

export const SocialSupportLink = ({href, image_icon, social_name}: supportLinkI) => {
  return (
    <div className={styles.wrapper}>
      <a className={styles.img_link} href={href} target="_blank" >
        <img src={image_icon} alt="" />
      </a>
      <p className={classNames(styles.info_text, 'mt-2')}> Свяжитесь со мной в {social_name} </p>
    </div>
  )
}
