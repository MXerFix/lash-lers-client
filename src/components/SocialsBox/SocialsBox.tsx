import React from 'react'
import styles from './socialsbox.css'
import telegramSVG from '../../public/img/telega.svg'
import instagramSVG from '../../public/img/instagram_3.svg'
import whatsappSVG from '../../public/img/whats_2.svg'
import alertSVG from '../../public/img/alert_square.svg'
import { SocialBlock } from '../../UI/SocialBlock/SocialBlock'
import { INSTAGRAM_URL, LERS_TELERGAM_URL, SUPPORT_TELEGRAM_URL, WHATSAPP_URL } from '../../utils/consts'

export const SocialsBox = () => {
  return (
    <div className={styles.socialsbox_main}>
      <div className={styles.socialsbox_rows}>
        <SocialBlock href={WHATSAPP_URL} img={whatsappSVG} />
        <SocialBlock href={INSTAGRAM_URL} img={instagramSVG} />
      </div>
      <div className={styles.socialsbox_rows}>
        <SocialBlock href={LERS_TELERGAM_URL} img={telegramSVG} />
        <SocialBlock href={SUPPORT_TELEGRAM_URL} img={alertSVG} />
      </div>
    </div>
  )
}
