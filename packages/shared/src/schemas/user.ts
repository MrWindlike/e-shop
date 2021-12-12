import { Schema } from '../../types/schema.d';
import { SchemaType } from '../const/schema';
import { PASSWORD } from '../const/regex';

const schema: Record<string, Schema> =  {
  account: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: '请输入账号',
      },
      {
        maxLength: 15,
        message: '账号必须小于等于15个字符',
      }
    ],
  },
  password: {
    type: SchemaType.String,
    defaultValue: '',
    rules: [
      {
        required: true,
        message: '请输入密码',
      },
      {
        maxLength: 15,
        message: '密码必须小于等于15个字符',
      },
      {
        regex: PASSWORD,
        message: '密码至少包含数字和英文，长度6-20'
      }
    ],
  }
};

export default schema;
