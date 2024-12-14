<template>
  <div class="container">
    <div class="signup-box">
      <h1>Sign Up</h1>

       <form @submit.prevent="register">
        
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          v-model="email"
          required
        />
  
         <!-- Clears custom validity message on input -->
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          v-model="password"
          @input="clearPasswordError"  
          required
        />
  
          
        
      <button class="signup" type="submit">Sign up</button>
         
      </form>
      
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "SignUpComponent",
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async register(event) {
        console.log("Sign up request triggered");
        const passwordField = event.target.querySelector("#password");// Gets the password input element
        const password = this.password;
        const email = this.email;
  
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
          alert(errorMessage); // Show error messages to the user
          return;
        }
  
        // Validation passed; make API call using fetch
        try {
          const response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to sign up");
          }
  
          const data = await response.json();
  
          // Save the JWT to localStorage
          localStorage.setItem("jwt", data.token);
  
        
          alert("User added successfuly!")
          this.$router.push("/login");
        } catch (error) {
          alert(error.message);
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

.signup-box {
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


.signup-box h1 {
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

</style>
