class ValidateFieldsService {
  #fields = {};
  #allowedFields = [];
  constructor(fields, allowedFields) {
    this.#fields = fields;
    this.#allowedFields = allowedFields;
  }

  execute() {
    const keys = Object.keys(this.#fields);

    const objectToUpdate = {};

    for (let key of keys) {
      const af = this.#allowedFields.find(x => x.name === key);
      if (af) {
        const value = this.#fields[key];
        if (typeof af.type === 'string') {
          if (value && String(value).length > 0) {
            objectToUpdate[key] = String(value);
          } else {
            return new Error(`The field ${key} is an invalid string`);
          }
        } else if (typeof af.type === 'number') {
          if (!Number.isNaN(Number(value)) && Number(value) >= 0) {
            objectToUpdate[key] = Number(value);
          } else {
            return new Error(`The field ${key} is an invalid number`);
          }
        }
      } else {
        return new Error(`The field ${key} does not exists or cannot be updated`);
      }
    }

    return objectToUpdate;
  }
}

module.exports = { ValidateFieldsService };
