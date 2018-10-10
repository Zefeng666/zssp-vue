<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      // this.handleLogin({ userName, password }).then(res => {
      //   this.getUserInfo().then(res => {
      //     this.$router.push({
      //       name: 'home'
      //     })
      //   })
      // })
      // return console.log(userName, password);

      this.$api
        .userLogin({
          username: userName,
          password: password
        })
        .then(data => {
          if (data.code === 200) {
            localStorage.setItem('token', data.data.jwt)
            localStorage.setItem('username', data.data.username)
            this.$router.push({
              name: 'home'
            })
          } else {
            this.$Message.error(data.message)
          }
        })
    }
  }
}
</script>

<style>

</style>
