const { Product } = require('../models/Product');

class EditProductService {
  async execute(userId, productId, newObject) {
    const result = await Product.findOne({
      where: {
        id: productId,
        user_id: userId,
      },
    });

    if (!result) {
      return new Error('This product does not exits');
    }

    const allowedFields = [
      {
        name: 'name',
        type: String(),
      },
      {
        name: 'price',
        type: Number(),
      },
      {
        name: 'quantity',
        type: Number(),
      },
      {
        name: 'photo',
        type: String(),
      },
      {
        name: 'description',
        type: String(),
      },
    ];
    const keys = Object.keys(newObject);

    const objectToUpdate = {};

    for (let key of keys) {
      const af = allowedFields.find(x => x.name === key);
      if (af) {
        const value = newObject[key];
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

    if (Object.keys(objectToUpdate).length !== 0) {
      await Product.update(objectToUpdate, {
        returning: true,
        where: {
          id: productId,
          user_id: userId,
        },
      });

      return (
        await Product.findOne({
          where: {
            id: productId,
            user_id: userId,
          },
        })
      ).toJSON();
    } else {
      return result.toJSON();
    }
  }
}

module.exports = { EditProductService };
