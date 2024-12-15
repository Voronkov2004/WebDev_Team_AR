import { createStore } from "vuex";

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
      return state.posts.find((post) => post.postID === id); // Finds a post by its ID
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

  actions: {
    async loadPosts({ commit }) {
      try {
        const response = await fetch("/public/data/posts.json"); 
        if (response.ok) {
          const postsData = await response.json();
          const postsWithLikes = postsData.map((post) => ({
            ...post,
            likes: 0, // Adds a `likes` property to each post
          }));
          commit("setPosts", postsWithLikes); // Commits the `setPosts` mutation
        } else {
          console.error("Failed to fetch posts.json");
        }
      } catch (error) {
        console.error("Error loading posts.json:", error.message);
      }
    },
  },
});
