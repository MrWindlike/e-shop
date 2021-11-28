import { Schema } from '../../types/schema';
import { SchemaType } from '../const/schema';
import { PHONE } from '../const/regex';

const schema: Record<string, Schema> = {
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
        ]
    },
    phone: {
        type: SchemaType.String,
        defaultValue: '',
        rules: [
            {
                required: true,
                message: 'Phone is required',
            },
            {
                maxLength: 11,
                message: 'Phone must be less than 11 characters',
            },
            {
                regex: PHONE,
                message: 'Phone must be a valid phone number',
            }
        ]
    },
    address: {
        type: SchemaType.String,
        defaultValue: '',
        rules: [
            {
                required: true,
                message: 'Address is required',
            },
            {
                maxLength: 63,
                message: 'Address must be less than 63 characters',
            }
        ]
    }
};

export default schema;
