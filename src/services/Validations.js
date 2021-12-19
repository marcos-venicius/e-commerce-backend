const yup = require('yup');

class Validations {
  /**
   * validate email throws an error if fail
   * @param {String} email email to validate
   */
  static email(email = '') {
    const shape = yup.object().shape({
      email: yup
        .string()
        .trim()
        .required('Você precisa informar um email')
        .email('Por favor informe um email válido'),
    });

    try {
      shape.validateSync({ email });
    } catch (e) {
      throw new Error(e.message);
    }
    return Validations;
  }

  /**
   * validate phone throws an error if fail
   * @param {String} phone phone to validate
   */
  static phone(phone = '') {
    const shape = yup.object().shape({
      phone: yup
        .string()
        .trim()
        .required('Por favor, informe um número de telefone')
        .length(11, 'Por favor informe um número válido'),
    });

    try {
      shape.validateSync({ phone });

      if (phone.split('').some(char => !'0123456789'.includes(String(char)))) {
        throw new Error('Seu telefone deve conter apenas números');
      }
    } catch (e) {
      throw new Error(e.message);
    }
    return Validations;
  }

  /**
   * validate password throws an error if fail
   * @param {String} password password to check
   */
  static password(password = '') {
    const shape = yup.object().shape({
      password: yup
        .string()
        .trim()
        .required('Por favor, informe uma senha')
        .min(8, 'Sua senha deve conter no mínimo 8 caracteres'),
    });

    try {
      shape.validateSync({ password });
    } catch (e) {
      throw new Error(e.message);
    }

    return Validations;
  }
}

module.exports = { Validations };
