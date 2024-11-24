<template>
  <div class="container">
    <div class="login-box">
      <h1>PostIt</h1>

      <form @submit.prevent="validatePassword">
        
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          v-model="email"
          required
        />

       
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          v-model="password"
          @input="clearPasswordError" 
          required
        />

        <button type="submit">Log in</button>
      </form>
      <a href="#" class="forgot-password">Forgot password?</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    
    validatePassword(event) {
      const passwordField = event.target.querySelector("#password");
      const password = this.password;

      
      let errorMessage = "";

      if (password.length < 8 || password.length >= 15) {
        errorMessage += "Password must be 8-14 characters long.\n";
      }
      if (!/^[A-Z]/.test(password)) {
        errorMessage += "Password must start with an uppercase letter.\n";
      }
      if (!/[A-Z]/.test(password)) {
        errorMessage += "Password must include at least one uppercase letter.\n";
      }
      if ((password.match(/[a-z]/g) || []).length < 2) {
        errorMessage += "Password must include at least two lowercase letters.\n";
      }
      if (!/\d/.test(password)) {
        errorMessage += "Password must include at least one numeric value.\n";
      }
      if (!/_/.test(password)) {
        errorMessage += "Password must include the character '_'.\n";
      }

      
      if (errorMessage) {
        passwordField.setCustomValidity(errorMessage);
        passwordField.reportValidity(); 
      } else {
        passwordField.setCustomValidity(""); 
        alert("Password is valid!"); 
      }
    },

    clearPasswordError(event) {
      event.target.setCustomValidity(""); 
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; 
  background-color: #4a4a4a;
  padding: 80px; 
  box-sizing: center;
}

.login-box {
  background: white;
  padding: 60px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; 
  text-align: center;
  box-sizing: border-box; 
  
}
form {
  margin-left: -30px; 
}


.login-box h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #7a2828;
}

input[type="email"],
input[type="password"] {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #7a2828;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #8e3030;
}

.forgot-password {
  display: block;
  margin-top: 15px;
  font-size: 14px;
  color: #7a2828;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}
</style>
