<template>
    <Header></Header>
    <SignUpComponent></SignUpComponent>
    <Footer></Footer>
  </template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import SignUpComponent from "@/components/SignUpComponent.vue";

export default {
  name: "SignUp",
  components: {
    Header,
    Footer,
    SignUpComponent,
  },
};
</script>


