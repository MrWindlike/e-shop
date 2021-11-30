import { Schema } from '../../types/schema.d';
import { SchemaType } from '../const/schema';

const schema: Record<string, Schema> =  {
  account: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: 'Account is required',
      },
      {
        maxLength: 15,
        message: 'Account must be less than 15 characters',
      }
    ],
  },
  password: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: 'Password is required',
      },
      {
        maxLength: 15,
        message: 'Password must be less than 15 characters',
      }
    ],
  }
};

export default schema;
