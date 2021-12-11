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
        message: '请输入姓名',
      },
      {
        maxLength: 15,
        message: '姓名必须小于等于15个字符',
      }
    ]
  },
  phone: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: '请输入手机号',
      },
      {
        maxLength: 11,
        message: '手机号必须小于等于11个字符',
      },
      {
        regex: PHONE,
        message: '请输入正确的手机号',
      }
    ]
  },
  address: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: '请输入地址',
      },
      {
        maxLength: 63,
        message: '地址必须小于等于63个字符',
      }
    ]
  }
};

export default schema;
