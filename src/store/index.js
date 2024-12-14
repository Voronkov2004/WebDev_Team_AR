import { createStore } from "vuex";
import postsData from "@/data/posts.json"; 

export default createStore({
  strict: true,

  state: {
    posts: [],
  },

  getters: {
    allPosts(state) {
      return state.posts; // Returns all posts
    },
    postById: (state) => (id) => {
      return state.posts.find((post) => post.postID === id); // Finds a post by its I
    },
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts; // Updates the `posts` array in the state
    },
    incrementLikes(state, postID) {
      const post = state.posts.find((post) => post.postID === postID);
      if (post) {
        post.likes = (post.likes || 0) + 1; // Increments the `likes` property of the post
      }
    },
    resetLikes(state) {
      state.posts.forEach((post) => {
        post.likes = 0; 
      });
    },
  },
/**Actions are used to perform asynchronous operations (e.g., 
 * fetching data from an API, processing data) before committing 
 * a mutation to update the state. */
  actions: {
    loadPosts({ commit }) {
      const postsWithLikes = postsData.map((post) => ({
        ...post,
        likes: 0, // Adds a `likes` property to each post
      }));
      commit("setPosts", postsWithLikes); // Commits the `setPosts` mutation
    },
  },
});
