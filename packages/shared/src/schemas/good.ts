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
            }
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
    },
    inventory: {
        type: SchemaType.Number,
        defaultValue: 0,
        rules: [
            {
                required: true,
                message: 'Inventory is required',
            }
        ]
    }
};

export default schema;
