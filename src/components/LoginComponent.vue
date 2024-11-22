<template>
  <div class="container">
    <div class="login-box">
      <h1>Welcome to PostIt</h1>
      <a href="#" class="create-account">Create an account</a>
      <p>or Please log in</p>

      <form action="index.html" method="GET">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
        />

        <button type="submit">Log in</button>
      </form>
      <a href="#" class="forgot-password">Forget password</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginComponent",
};
</script>
<style>
.container {
  display: flex;
  justify-content: center; /*centers the child elements horizontally within the container.*/
  align-items: center; /*centers the child elements vertically within the container.*/
  height: 100vh;
}
.login-box h1 {
  font-size: medium;
  padding-bottom: 10px;
}
/* Class Selector */
.login-box {
  background-color: #e2e2e2;
  padding: 5px 40px 10px 40px;
  border-radius: 10px;
  text-align: center;
}

/* Descendant selector */
.login-box a {
  display: block;
  text-decoration: none;
  color: #46b8e1;
}

form {
  display: flex;
  flex-direction: column; /* Stack form elements vertically */
  align-items: center; /* Center the form elements */
}
/* Input fields styling */
input[type="text"],
input[type="password"],
input[type="email"] {
  width: 90px;
  font-family: "Lucida Console";
  padding: 5px;
  margin: 2px;
  height: 20px;
  border: 1px solid #cccccc;
}

.login-box button {
  background-color: #2d748e;
  color: white;
  margin: 12px;
  border: none;
  padding: 6px;
  width: 70px;
  cursor: pointer;
}

/* Adjacent sibling selector */
h1 + a.create-account {
  color: #46b8e1; /* Turns the 'Create an account' link red */
  font-weight: bold;
}

/* General sibling selector */
h1 ~ p {
  font-style: italic;
}

li > a {
  color: white;
  display: block;
  text-decoration: none;
  text-align: center;
  width: 100%;
}
</style>
