<template>
  <article class="blogPost">
    <PostNav :pfp="pfp" :pfpAlt="pfpAlt" :postedDate="postedDate" />
    <!-- Only render the post image if postPicture is truthy -->
    <img
      v-if="postPicture"
      :src="postPicture"
      :alt="postPictureAlt"
      class="post-image"
    />
    <PostFooter
      :textPost="textPost"
      :authorName="authorName"
      :likes="likes"
      @increment-like="incrementLikes"
    />
  </article>
</template>

<script>
import PostNav from "./PostNav.vue";
import PostFooter from "./PostFooter.vue";

export default {
  name: "Post",
  components: {
    PostNav,
    PostFooter,
  },
  props: {
    postPicture: String,
    postPictureAlt: String,
    textPost: String,
    authorName: String,
    pfp: String,
    pfpAlt: String,
    postedDate: String,
    likes: Number,
  },
  methods: {
    incrementLikes() {
      this.$emit("increment-like");
    },
  },
};
</script>

<style scoped>
.blogPost {
  border: 3px solid black;
  border-radius: 10px;
  width: 80%;
  max-width: 800px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.blogPost > img {
  width: 90%;
  height: auto;
  padding: 10px;
}
</style>
//Компонент для отображения одного поста.
