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

type ValidationType = { isValid: boolean; errorMessage?: string };

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

export const validateCreditCard = (value: string): boolean => {
  if(validateField(value)) {
    return value.length === 16;
  }
  return false;
}

// export const validateEmail = (value = ''): boolean => {
//   return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value));
//   // return (/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.test(value));
// }

export const validateEmail = (value: string): ValidationType => {
  // return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value));
  // return (/^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/.test(value));
  return {
    isValid: validateField(value) ? (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) : false,
    errorMessage: 'Error en el Email', 
  };
}

export const validateBirthDate = (value = ''): boolean => {
  return moment(value, 'DD/MM/YYYY', true).isValid();
}

