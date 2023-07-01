<template>
  <div class="wrap">
    <div class="bigWrap">
      <h2 class="head-title">WELCOME TO COLLEGE COMPETITION WEBSITE</h2>

      <div
        class="container"
        id="container"
        :class="[isIn ? 'right-panel-active' : '']"
      >
        <div class="form-container sign-up-container">
          <form :model="upFrom" @submit.prevent>
            <h1>Create Account</h1>
            <div class="social-container">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"> <i class="fab fa-google-plus-g"></i> </a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" placeholder="Name" v-model="upFrom.Name" />
            <input type="email" placeholder="Email" v-model="upFrom.Account" />
            <input
              type="password"
              placeholder="Password"
              v-model="upFrom.Password"
            />
            <button @click="signUp">Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form :model="form" @submit.prevent>
            <h1>Sign in</h1>
            <div class="social-container">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"> <i class="fab fa-google-plus-g"></i> </a>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" v-model="form.Account" />
            <input
              type="password"
              placeholder="Password"
              v-model="form.Password"
            />
            <a href="#">Forgot your password?</a>
            <button @click="signIn">Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button class="ghost" id="signIn" @click="changePlanel()">
                Sign In
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello,Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ghost" id="signUp" @click="changePlanel()">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 style="temp"></h2>
    </div>

    <footer>
      <p>
        Created with<i class="fa fa-heart"></i>by
        <a href="#" target="_blank">粤ICP备广州城市理工学院</a>
      </p>
    </footer>
  </div>
</template>

<script>
import Mock from "mockjs";
// import { getMenu } from "../../api/data";
import { registerUser, login } from "../../api/test";
export default {
  name: "login",
  data() {
    return {
      isIn: true,
      form: { how: "PC", ip: "192.155.13.7" },
      upFrom: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于三位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    signUp() {
      registerUser(this.upFrom)
        .then(({ data: res }) => {
          this.changePlanel();
          console.log(this.form, "ss");
          this.$message.success("注册成功！");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePlanel() {
      this.isIn = !this.isIn;
    },
    check() {
      //邮箱校验
      var reg = /^[\w.-]+@[0-9a-zA-Z]+(\.[a-zA-Z]{2,4}){1,2}$/;
      return reg.test(this.form.username);
    },
    signIn() {
      // console.log(this.check());
      console.log(this.form, "fdsfds");
      login(this.form)
        .then(({ data: res }) => {
          console.log(res, "fdaf1111111111111111");
          console.log(res, "fdaf1111111111111111");
          console.log(res, "fdaf1111111111111111");
          console.log(res.data.token, "fdaf1111111111111111");

          // res = JSON.parse(res);
          // console.log(res, "fdaf1111111111");
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
          // console.log(res, "fdsfdsfs");
        })
        .catch((err) => {
          console.log(err);
        });

      // getMenu(this.form).then(({ data: res }) => {
      //   console.log(res);
      //   if (res.code === 20000) {
      //     this.$store.commit("clearMenu");
      //     this.$store.commit("setMenu", res.data.menu);
      //     this.$store.commit("setToken", res.data.token);
      //     this.$store.commit("addMenu", this.$router);
      //     this.$router.push({ name: "home" });
      //   } else {
      //     this.$message.warning(res.data.message);
      //   }
      // });
      // const token = Mock.random.guid();
      // this.$store.commit("setToken", token);
      // this.$router.push({ name: "home" });
    },
  },
  async mounted() {
    // let data = await fetch("http://192.168.98.190:8085/login/verify", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ Account: "user1", Passwrod : "123" }),
    //   mode: "cors",
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // console.log(data, "fdsfds");
    // let data = await getUser();
    // console.log(data, "this.data");
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;1,100&display=swap");
* {
  box-sizing: border-box;
}

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../../assets/images/bg.jpg") no-repeat;
  background-size: 100%;
  z-index: 1;
}

.head-title {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 48px;
  font-weight: bold;
  font-style: italic;
  color: rgb(137, 233, 224);
  z-index: 999;
  text-shadow: 0 14px 28px rgba(0, 0, 0, 0.6), 0 10px 10px rgba(0, 0, 0, 0.6);
}

h1 {
  font-weight: bold;
  margin: 0;
}
h2 {
  text-align: center;
}
p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}
span {
  font-size: 12px;
}
a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}
button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}
button:hover {
  cursor: pointer;
}
button:active {
  transform: scale(0.95);
}
button:focus {
  outline: none;
}
button.ghost {
  background-color: transparent;
  border-color: #ffffff;
}
form {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}
input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.bigWrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  width: 70vw;
  max-width: 100%;
  min-height: 80vh;
}
.container {
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}
@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}
.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.overlay {
  background: transparent;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}
.overlay-left {
  transform: translateX(-20%);
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
}
.overlay-right {
  right: 0;
  transform: translateX(0);
}
.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
.social-container {
  margin: 20px 0;
}
.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}
footer p {
  margin: 10px 0;
}
footer i {
  color: red;
}
footer a {
  color: #3c97bf;
  text-decoration: none;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-title {
  margin: 0 auto 40px auto;
  text-align: center;
  color: #595358;
}

.login-submit {
  margin: 10px auto 0 auto;
}
</style>
