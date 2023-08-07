import { useState } from 'react';
import { ERROR_ALERT, GREEN_ALERT, WARNING_ALERT } from '../utils/consts';

const [error, setError] = useState(0)
const [errorMessage, setErrorMessage] = useState('')

const errorHandler = (code: number) => {
  switch (code) {
    case 1: return {
      message: errorMessage,
      alertType: ERROR_ALERT
    }
    case 2: return {
      message: errorMessage,
      alertType: WARNING_ALERT
    }
    case 3: return {
      message: errorMessage,
      alertType: GREEN_ALERT
    }
  }
  return {
    message: '',
    alertType: ''
  }
}