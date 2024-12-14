<template>
    <div class="contact-page">
      <Header></Header>
      <ContactComponent></ContactComponent>
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import ContactComponent from "@/components/ContactComp.vue";
  
  export default {
    name: "Contact",
    components: {
      Header,
      Footer,
      ContactComponent,
    },
  };
  </script>
  
  <style scoped>
  .contact-page {
    overflow: hidden; 
    height: 100vh; /* Ensure it takes up the full viewport height */
    
  }
  .contact-page{
    background-color: #4a4a4a;
  }
  </style>
  