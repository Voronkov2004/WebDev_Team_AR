<template>
  <Header></Header>
  <LoginComponent></LoginComponent>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "Login",
  components: {
    Header,
    Footer,
    LoginComponent,
  },
};
</script>

<style>

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}



</style>