import { createStore } from "vuex";
import postsData from "@/data/posts.json"; 

export default createStore({
  strict: true,

  state: {
    posts: [],
  },

  getters: {
    allPosts(state) {
      return state.posts; 
    },
    postById: (state) => (id) => {
      return state.posts.find((post) => post.postID === id); 
    },
  },

  mutations: {
    setPosts(state, posts) {
      state.posts = posts; 
    },
    incrementLikes(state, postID) {
      const post = state.posts.find((post) => post.postID === postID);
      if (post) {
        post.likes = (post.likes || 0) + 1; 
      }
    },
    resetLikes(state) {
      state.posts.forEach((post) => {
        post.likes = 0; 
      });
    },
  },

  actions: {
    loadPosts({ commit }) {
      const postsWithLikes = postsData.map((post) => ({
        ...post,
        likes: 0, 
      }));
      commit("setPosts", postsWithLikes); 
    },
  },
});
