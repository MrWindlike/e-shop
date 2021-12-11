<template>
  <div class="v-login-page">
    <h1 class="v-login-page-title">{{title}}</h1>
    <el-form
      class="v-login-page-form"
      ref="form"
      :model="form"
      :rules="rules"
    >
      <el-form-item prop="account">
        <el-input
          v-model="form.account"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item prop="confirm" v-if="type === 'register'">
        <el-input
          v-model="form.confirm"
          placeholder="请再次输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-button
        v-if="type === 'login'"
        type="primary"
        class="v-login-page-button"
        @click="login"
      >登录</el-button>
      <el-button
        v-else
        type="primary"
        class="v-login-page-button"
        @click="register"
      >注册</el-button>
      <div class="v-login-page-tip" v-if="canRegister">
        <template v-if="type === 'login'">
          还没有账号？ <el-button type="text" @click="switchForm">点此注册</el-button>
        </template>
        <template v-else>
          已经有账号？ <el-button type="text" @click="switchForm">去登陆</el-button>
        </template>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  Input,
  Button,
} from 'element-ui';
import userSchema from '../../schemas/user';

export default {
  name: 'VLogin',
  components: {
    ElForm: Form,
    ElFormItem: FormItem,
    ElInput: Input,
    ElButton: Button,
  },
  props: {
    title: {
      type: String,
      default: 'Login',
    },
    type: {
      type: String,
      default: 'login',
    },
    canRegister: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      form: {
        account: '',
        password: '',
        confirm: '',
      },
      rules: Object.keys(userSchema).reduce((result, key)=> {
        const schema = userSchema[key];

        result[key] = schema.rules;

        return result;
      }, {
        confirm: [
          {
            required: true,
            message: 'Please enter your password again',
          },
          {
            validator: (rule, value, callback)=> {
              if (value !== this.form.password) {
                callback(new Error('The two passwords that you entered do not match'));
              } else {
                callback();
              }
            },
          },
        ]
      }),
    };
  },
  methods: {
    switchForm() {
      this.$emit('switch');
    },
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('login', this.form);
        }
      });
    },
    register() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('register', this.form);
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.v-login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  &-title {
    font-size: 32px;
    margin-bottom: 40px;
  }

  &-form {
    padding: 25px;
    width: 320px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }

  &-button {
    display: block;
    width: 100%;
    margin-left: 0;
    margin-top: 5px;
  }

  &-tip {
    font-size: 14px;
    display: block;
  }
}
</style>
