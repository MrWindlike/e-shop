import { SchemaType } from '../const/schema';
import { Schema } from '../../types/schema';

const schema: Record<string, Schema> = {
  addressId: {
    type: SchemaType.Number,
    rules: [
      {
        required: true,
        message: 'AddressID is required'
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
            message: 'ID is required',
          }
        ]
      },
      count: {
        type: SchemaType.Number,
        defaultValue: 0,
        rules: [
          {
            required: true,
            message: 'Count is required',
          },
          {
            min: 1,
            message: 'Count must be greater than 0',
          },
          {
            max: 99999999,
            message: 'Count must be less than 99999999',
          }
        ]
      }
    }
  }
};

export default schema;
