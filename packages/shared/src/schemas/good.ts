import { Schema } from '../../types/schema.d';
import { SchemaType } from '../const/schema';

const schema: Record<string, Schema> =  {
  name: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: 'Name is required',
      },
      {
        maxLength: 15,
        message: 'Name must be less than 15 characters',
      }
    ],
    options: {
      trim: true,
    }
  },
  price: {
    type: SchemaType.Number,
    defaultValue: 0,
    rules: [
      {
        required: true,
        message: 'Price is required',
      },
      {
        min: 0,
        message: 'Price must be greater than 0',
      },
      {
        max: 99999999.99,
        message: 'Price must be less than 99999999.99',
      },
    ]
  },
  description: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: 'Description is required',
      },
      {
        maxLength: 255,
        message: 'Description must be less than 255 characters',
      }
    ],
    options: {
      escape: true,
      trim: true,
    }
  },
  inventory: {
    type: SchemaType.Number,
    defaultValue: 0,
    rules: [
      {
        required: true,
        message: 'Inventory is required',
      },
      {
        min: 0,
        message: 'Inventory must be greater than 0',
      },
      {
        max: 99999999,
        message: 'Inventory must be less than 99999999',
      }
    ]
  },
  image: {
    type: SchemaType.File,
    rules: [
      {
        required: true,
        message: 'Image is required',
      },
    ],
    options: {
      size: '2mb',
      extnames: ['jpg', 'png'],
    }
  }
};

export default schema;
