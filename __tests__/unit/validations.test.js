const { Validations } = require('../../src/services/Validations');

describe('Test Validations class', () => {
  const validations = Validations;
  it('Should throws an Error class if pass an empty email', () => {
    try {
      validations.email('');
    } catch (e) {
      expect(e.message).toBe('Você precisa informar um email');
    }
  });

  it('Should throws an Error class if pass an invalid email', () => {
    try {
      validations.email('marcos.jose123');
    } catch (e) {
      expect(e.message).toBe('Por favor informe um email válido');
    }
  });

  it('Should return Validations class if pass a valid email', () => {
    const result = validations.email('marcos.ed@gmail.com');

    expect(result).toBe(Validations);
  });

  it('Should throws an Error class if pass an invalid phone', () => {
    try {
      validations.phone('40028922');
    } catch (e) {
      expect(e.message).toBe('Por favor informe um número válido');
    }
  });

  it('Should throws an Error class if pass a strings into phone', () => {
    try {
      validations.phone('859812201E1');
    } catch (e) {
      expect(e.message).toBe('Seu telefone deve conter apenas números');
    }
  });

  it('Should return Validations class if pass a valid phone', () => {
    const result = validations.phone('85981220121');

    expect(result).toBe(Validations);
  });

  it('Should throws an Error class if call with valid email but wrong phone', () => {
    try {
      validations.email('marcos.ed@gmail.com').phone('859812201E1');
    } catch (e) {
      expect(e.message).toBe('Seu telefone deve conter apenas números');
    }
  });

  it('Should throws an Error class if pass an invalid password', () => {
    try {
      validations.password('12345');
    } catch (e) {
      expect(e.message).toBe('Sua senha deve conter no mínimo 8 caracteres');
    }
  });
});
