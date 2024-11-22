<template>
  <Header></Header>
  <Sidebars></Sidebars>
  <main>
    <Post
      v-for="post in posts"
      :key="post.postID"
      :postPicture="post.postImage"
      :postPictureAlt="post.postText"
      :textPost="post.postText"
      :authorName="post.postAuthorName"
      :pfp="post.postAuthorPFP"
      :pfpAlt="post.postAuthorName"
      :postedDate="
        new Date(post.postCreated).toLocaleString([], {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      "
    ></Post>
  </main>
  <Footer></Footer>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebars from "@/components/Sidebars.vue";
import Post from "@/components/Post.vue";
import postsData from "@/data/posts.json";

export default {
  name: "BlogPost",
  components: {
    Header,
    Footer,
    Sidebars,
    Post,
  },
  data() {
    return {
      posts: postsData,
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Lucida Console", "Courier New";
}

html {
  margin: 0;
  padding: 0;
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
</style>
