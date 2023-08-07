import React from 'react'
import { SocialSupportLink } from '../../UI/SocialSupportLink/SocialSupportLink'
import styles from './support.css'
import whats_icon from '../../public/img/whats_2.svg'
import instagram_icon from '../../public/img/instagram_3.svg'
import classNames from 'classnames'
import { INSTAGRAM_URL, IS_TEST, LERS_TELERGAM_URL, SUPPORT_TELEGRAM_URL, WHATSAPP_URL } from '../../utils/consts'

export const Support = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <h2 className={classNames(styles.title, 'text-20')}> Свяжитесь со мной удобным для Вас способом </h2>
        <div className={styles.links_box}>
          <SocialSupportLink href={WHATSAPP_URL} social_name='whatsapp' image_icon={whats_icon} />
          <SocialSupportLink href={INSTAGRAM_URL} social_name='instagram' image_icon={instagram_icon} />
        </div>
      </div>
      {IS_TEST ?
        <span
          className='text-red-500 text-center text-14'>
          Внимание! Приложение работает в тестовом режиме! <br />
          Информацию об ошибках и предложения по улучшению приложения можно отправлять в <br />
          <a
            className={classNames(styles.support_a, 'block w-max mx-auto mt-1 scale-125')}
            style={{ padding: "0px 4px", backgroundColor: "rgb(255, 60, 60)", color: "white" }}
            target={'_blank'}
            href={SUPPORT_TELEGRAM_URL}>
            телеграм </a>
        </span>
        : <p
          className={styles.info_text}>
          Если у Вас есть вопросы, связанные с работой сервиса, напишите в
          <a
            className={styles.support_a}
            style={{ padding: "0px 4px" }}
            target={'_blank'}
            href={SUPPORT_TELEGRAM_URL}>
            телеграм
          </a>
        </p>
      }
    </div>
  )
}
