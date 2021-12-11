import { SchemaType } from '../const/schema';
import { Schema } from '../../types/schema';

const schema: Record<string, Schema> = {
  addressId: {
    type: SchemaType.Number,
    rules: [
      {
        required: true,
        message: '请选择收货地址'
      }
    ]
  },
  goods: {
    type: SchemaType.Array,
    schemas: {
      id: {
        type: SchemaType.Number,
        rules: [
          {
            required: true,
            message: '请选择商品',
          }
        ]
      },
      count: {
        type: SchemaType.Number,
        defaultValue: 0,
        rules: [
          {
            required: true,
            message: '必选填写商品数量',
          },
          {
            min: 1,
            message: '商品数量必须大于0',
          },
          {
            max: 99999999,
            message: '商品数量不能大于99999999',
          }
        ]
      }
    }
  }
};

export default schema;
