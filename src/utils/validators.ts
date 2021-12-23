import moment from 'moment';

const ERROR_CODES = {
  '001': 'Asegurate que el nombre sea correcto.',
  '002': 'El nombre solo puede contener letras.',
  '003': 'Asegurate que el apellido sea correcto.',
  '004': 'El apellido solo puede contener letras.',
  '005': 'Ingresá el DNI sin puntos ni espacios.',
  '010': 'El DNI solo puede contener números.',
  '006': 'Asegurate de que el e-mail sea correcto.',
  '007': 'Asegurate de que el código de área sea correcto.',
  '011': 'El código de área solo puede contener números.',
  '008': 'Asegurate de que el celular sea correcto.',
  '009': 'El celular solo puede contener números.',
}

export type ValidationType = { isValid: boolean; errorMessage?: string };

const checkIfHaveOnlyNumbers = (value = '') => /^[0-9]*$/.test(value);
const checkIfHaveNumber = (value: string):boolean => /\d/.test(value);
const checkMinLength = (value: string, minLength: number): boolean => (value.length < minLength);

export const validateNotEmptyField = (value: string): ValidationType => {
  if(checkMinLength(value, 2)) {
    return {
      isValid: false,
      errorMessage: 'Asegurate de que el campo no esté vacío',
    };
  }

  return {
    isValid: true,
    errorMessage: '',
  };
};

export const validateField = (value: string): ValidationType => {
  return {
    isValid: (value !== '' && !/^[A-Za-z]+$/i.test(value)) && true,
    errorMessage: '',
  };
};

export const validateAmount = (monto = '', otherAmount = ''): boolean => {
  return !(monto === '' || (monto === 'otherAmount' && otherAmount === '')) ;
}

export const validateFirstName = (value = '', minLength = 2): ValidationType => {
  if(checkMinLength(value, 2)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['001'],
    };
  } else if (checkIfHaveNumber(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['002'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateLastName = (value = '', minLength = 2): ValidationType => {
  if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['003'],
    };
  } else if (checkIfHaveNumber(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['004'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateAreaCode = (value = '', minLength = 2): ValidationType => {
  if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['007'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['011'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validatePhoneNumber = (value = '', minLength = 8): ValidationType => {
  if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['008'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['009'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateCitizenId = (value: string, minLength = 8): ValidationType => {
  if(checkMinLength(value, minLength)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['005'],
    };
  } else if (!checkIfHaveOnlyNumbers(value)) {
    return {
      isValid: false,
      errorMessage: ERROR_CODES['010'],
    }
  }

  return {
    isValid: true,
    errorMessage: '',
  };
}

export const validateCreditCard = (value: string): ValidationType => {
  return {
    isValid: validateField(value) ? (/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(value)) : false,
    errorMessage: 'El número de tarjeta es inválido', 
  };
}

export const validateEmail = (value: string): ValidationType => {
  return {
    isValid: validateField(value) ? (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) : false,
    errorMessage: 'Error en el Email', 
  };
}

export const validateBirthDate = (value = ''): boolean => {
  return moment(value, 'DD/MM/YYYY', true).isValid();
}

