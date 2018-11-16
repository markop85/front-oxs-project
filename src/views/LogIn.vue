<template>
    <div class="main-login-container flex align-center justify-center column">
        <div class="login-credentials">
            <h2>LogIn For demo User</h2>
            <div>email: david.cohen@gmail.com</div>
            <div>password: 123456</div>
        </div>

        <div class="logIn-field flex column space-between">
            <input v-model="user.email" type="email" placeholder="Email" required/>
            <input v-model="user.password" type="password" placeholder="Password" required/>
            <button @click="logIn">LogIn</button>
        </div>
        <h1 v-if="wrongInput" class="worning">Your Email or Password Is Incorrect</h1>


    </div>
</template>


<script>
import { LOG_IN } from "../store/UserStore";

export default {
  data() {
    return {
      user: {
        password: "",
        email: ""
      },
      wrongInput: false
    };
  },

  methods: {
    logIn() {
      if (
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
          this.user.email
        ) &&
        this.user.password.length > 1
      ) {
        this.$store
          .dispatch({ type: LOG_IN, user: this.user }) //check if email is valid,if not then alert
          .then(message => {
            if (message != "Auth successful") {
              this.wrongInput = true;
              return;
            }
            this.$router.push(`/home`);
          });
      } else {
        this.wrongInput = true;
      }
    }
  }
};
</script>
<style scoped>
.main-login-container {
  height: 100%;
  width: 100%;
}
.login-credentials {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  border: 1px solid black;
}

.logIn-field input {
  width: 300px;
  height: 30px;
  margin-bottom: 20px;
}

.logIn-field button {
  width: 300px;
  height: 30px;
  cursor: pointer;
}

.worning {
  color: red;
}
</style>

