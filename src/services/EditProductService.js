const { Product } = require('../models/Product');
const { ValidateFieldsService } = require('./ValidateFieldsService');

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

    const validateFieldsService = new ValidateFieldsService(newObject, allowedFields);
    const objectToUpdate = validateFieldsService.execute();

    if (objectToUpdate instanceof Error) {
      return objectToUpdate;
    }

    if (Object.keys(objectToUpdate).length !== 0) {
      await Product.update(objectToUpdate, {
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
