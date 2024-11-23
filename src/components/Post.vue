<template>
  <article class="blogPost">
    <PostNav :pfp="pfp" :pfpAlt="pfpAlt" :postedDate="postedDate" />
    <img :src="postPicture" :alt="postPictureAlt" class="post-image" />
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
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.blogPost > img {
  width: 100%;
  height: auto;
  padding: 10px;
}

.blogPost > h1 {
  padding: 20px;
}

.blogPost > p {
  padding: 20px;
}
</style>
