<template>
  <div>
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
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Sidebars from "@/components/Sidebars.vue";
import Post from "@/components/Post.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "BlogPost",
  components: {
    Header,
    Footer,
    Sidebars,
    Post,
  },
  computed: {
    ...mapGetters(["allPosts"]),
    posts() {
      return this.allPosts;
    },
  },
  methods: {
    ...mapMutations(["incrementLikes", "resetLikes"]),
  },
};
</script>

<style>
main {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.reset-button {
  align-items: center;
  background-color: #723d3d;
  border-radius: .25rem;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #a45a5a;
}

</style>
