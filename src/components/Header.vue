<template>
  <header>
    <ul class="navBar">
      <div class="left-side">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/addpost">Add Post</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </div>
      <div class="right-side">
        <Dropdown></Dropdown>
      </div>
    </ul>
  </header>
</template>

<script>
import Dropdown from "@/components/Dropdown.vue";

export default {
  name: "Header",
  components: {
    Dropdown,
  },
};
</script>

<style>
header img {
  width: auto px;
  height: 60px;
  border-radius: 50%;
}

header {
  background-color: #333;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  height: 80px;
  justify-content: space-between;
  z-index: 10;
}

li {
  float: left;
  padding: 15px;
  list-style-type: none;
  align-items: center;
}

.navBar {
  width: 100%;
  padding: 0;
  margin: 0;
  align-items: center;
  text-decoration: none;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

li:hover {
  background-color: rgb(164, 164, 164);
}

li > a {
  color: white;
  display: block;
  text-decoration: none;
  text-align: center;
  list-style: none;
  width: 100%;
}

li > a:hover {
  color: white;
}
</style>
