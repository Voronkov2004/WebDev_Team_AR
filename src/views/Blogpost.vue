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
      :likes="post.likes"
      @increment-like="incrementLikes(post.postID)"
    ></Post>
  </main>
  <button @click="resetLikes" class="reset-button">Reset Likes</button>
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
      posts: postsData.map((post) => ({
        ...post,
        likes: 0, 
      })),
    };
  },
  methods: {
    resetLikes() {
      this.posts.forEach((post) => {
        post.likes = 0;
      });
    },
    incrementLikes(postID) {
      const post = this.posts.find((post) => post.postID === postID);
      if (post) {
        post.likes += 1;
      }
    },
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


.reset-button {
  align-items: center;
  background-clip: padding-box;
  background-color: #723d3d;
  border: 1px solid transparent;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: system-ui,-apple-system,system-ui,"Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

.reset-button:hover,
.reset-button:focus {
  background-color: #a45a5a;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

.reset-button:hover {
  transform: translateY(-1px);
}

.reset-button:active {
  background-color: #985454;
  box-shadow: rgba(0, 0, 0, .06) 0 2px 4px;
  transform: translateY(0);
}



</style>
