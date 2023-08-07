
// DEV

export const IS_TEST = true

// AXIOS ERRORS

export const ERROR_404 = 'Server Error 404'

// ALERT STATUSES

export const WARNING_ALERT = 'warning_alert'
export const ERROR_ALERT = 'error_alert'
export const GREEN_ALERT = 'green_alert'

export const MODAL_TIMEOUT = 5000
export const FETCH_TIMEOUT = 650

// URL 

export const HOST_URL = 'http://localhost:3400/'

export const LERS_TELERGAM_URL = 'https://t.me/leerssl'
export const SUPPORT_TELEGRAM_URL = 'https://t.me/maksrdmitr'
export const WHATSAPP_URL = 'https://wa.me/79963837899'
export const INSTAGRAM_URL = 'https://www.instagram.com/lash_lers'


// ROUTES 

export const ADMIN_ROUTE = 'admin'
export const PROFILE_ROUTE = 'profile'
export const HOME_ROUTE = '/'
export const PRICELIST_ROUTE = 'pricelist'
export const ABOUT_ROUTE = 'about'
export const PORTFOLIO_ROUTE = 'portfolio'
export const ENTRY_ROUTE = 'entry'
export const SUPPORT_ROUTE = 'support'
export const AUTH_ROUTE = 'auth'


// LASH TYPES

export const CLASSIC_LASHES = 'Классика'
export const D15_LASHES = '1.5D'
export const D2_LASHES = '2D'
export const D25_LASHES = '2.5D'
export const WET_EFFECT = 'Мокрый эффект'
export const REMOVE_LASHES = 'Снятие ресниц другого мастера'
export const REMOVE_MY_LASHES = 'Снятие моих ресниц'
export const REMOVE_MY_LASHES_WITH_NEXT = 'Снятие моих ресниц с последующим наращиванием'
export const ANGLE_LASHES = 'Уголки'

// LASH PRICES

export const lashPrice = (lash_type) => {
  switch (lash_type) {
    case CLASSIC_LASHES : {return 700; break;}
    case D15_LASHES : {return 800; break;}
    case D2_LASHES : {return 1000; break;}
    case D25_LASHES : {return 1200; break;}
    case REMOVE_LASHES : {return 200; break;}
    case REMOVE_MY_LASHES : {return 150; break}
    case REMOVE_MY_LASHES_WITH_NEXT : {return 0; break}
    case WET_EFFECT : {return 1300; break}
    case ANGLE_LASHES: {return 600; break}
    return lash_type
  }
}
