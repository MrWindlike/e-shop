import { Schema } from '../../types/schema.d';
import { SchemaType } from '../const/schema';

const schema: Record<string, Schema> =  {
  name: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: '请输入商品名称',
      },
      {
        maxLength: 15,
        message: '商品名称必须小于等于15个字符',
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
        message: '请输入价格',
      },
      {
        min: 0,
        message: '价格必须为大于等于0',
      },
      {
        max: 9999999.99,
        message: '价格必须小于等于99999999.99',
      },
    ]
  },
  description: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: '请输入商品描述',
      },
      {
        maxLength: 255,
        message: '商品描述必须小于等于255个字符',
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
        message: '请输入库存',
      },
      {
        min: 0,
        message: '库存必须大于等于0',
      },
      {
        max: 99999,
        message: '库存必须小于等于99999',
      }
    ]
  },
  image: {
    type: SchemaType.File,
    rules: [
      {
        required: true,
        message: '请上传商品图片',
      },
    ],
    options: {
      size: '2mb',
      extnames: ['jpg', 'png'],
    }
  }
};

export default schema;
