<template>
  <Header></Header>
  <div class="prettier">
    <AddPostForm></AddPostForm>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import AddPostForm from "@/components/AddPostForm.vue";

export default {
  name: "AddPost",
  components: {
    Header,
    Footer,
    AddPostForm,
  },
};
</script>
<style>
.prettier {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
