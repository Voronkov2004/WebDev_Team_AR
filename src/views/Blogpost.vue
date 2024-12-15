<template>
  <div>
    <Header></Header>
    <Sidebars></Sidebars>
    <main>
      <!-- If a post is selected, show the details, update, and delete options -->
      <div v-if="selectedPost" class="post-details">
        <h1>Post Details</h1>
        <img
          v-if="selectedPost.postimage"
          :src="selectedPost.postimage"
          :alt="selectedPost.posttext"
          class="post-image"
        />

        <!-- Editable text area for updating post text -->
        <h2>Post Text</h2>
        <textarea v-model="editedText" rows="4" cols="50"></textarea>

        <p><strong>Author:</strong> {{ selectedPost.postauthorname }}</p>
        <p>
          <strong>Posted on:</strong>
          {{
            new Date(selectedPost.postcreated).toLocaleString([], {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          }}
        </p>
        <p><strong>Likes:</strong> {{ selectedPost.likes || 0 }}</p>

        <div class="button-group">
          <button @click="updatePost" class="post-action-button">
            Update Post
          </button>
          <button @click="deletePost" class="post-action-button">
            Delete Post
          </button>
          <button @click="backToPosts" class="post-action-button">
            Back to Posts
          </button>
        </div>
      </div>

      <!-- If no post is selected, show the posts list as before -->
      <div v-else class="posts-container">
        <button @click="$router.push('/addpost')" class="add-post-button">
          Add Post
        </button>

        <!-- Maintaining original structure and @click.native -->
        <Post
          v-for="post in posts"
          :key="post.postid"
          :postPicture="post.postimage"
          :postPictureAlt="post.posttext"
          :textPost="post.posttext"
          :authorName="post.postauthorname"
          :pfp="post.postauthorpfp"
          :pfpAlt="post.postauthorname"
          :postedDate="
            new Date(post.postcreated).toLocaleString([], {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          "
          :likes="post.likes || 0"
          @click.native="selectPost(post)"
          @increment-like="incrementLikes(post.postid)"
        >
          <PostNav
            :pfp="post.postauthorpfp"
            :pfpAlt="post.postauthorname"
            :postedDate="post.postcreated"
          />
        </Post>
      </div>
    </main>
    <div class="button-container">
      <button @click="resetAllLikes" class="styled-button">Reset Likes</button>
      <button @click="deleteAllPosts" class="styled-button">
        Delete All Posts
      </button>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import PostNav from "@/components/PostNav.vue";
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
    PostNav,
  },
  data() {
    return {
      posts: [],
      selectedPost: null,
      editedText: "",
    };
  },

  computed: {
    ...mapGetters(["allPosts"]), // Maps the `allPosts` getter from Vuex
    posts() {
      return this.posts.length > 0 ? this.posts : this.allPosts;
    },
  },
  methods: {
    ...mapMutations(["incrementLikes", "resetLikes"]),
    async incrementLikes(postID) {
      const post = this.posts.find((p) => p.postid === postID);
      if (post) {
        post.likes = (post.likes || 0) + 1;
      }
    },

    async selectPost(post) {
      // Check if the user is authenticated before fetching and showing post details
      try {
        const authResponse = await fetch(
          "http://localhost:3000/auth/authenticate",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (authResponse.ok) {
          const data = await authResponse.json();
          if (data.authenticated) {
            // User is authorized, now fetch the specific post
            const response = await fetch(
              `http://localhost:3000/posts/${post.postid}`
            );
            if (response.ok) {
              const fetchedPost = await response.json();
              this.selectedPost = fetchedPost;
              this.editedText = fetchedPost.posttext;
              console.log("Selected Post:", fetchedPost);
            } else {
              console.error("Failed to fetch specific post details");
              alert("Failed to load the selected post.");
            }
          } else {
            alert("You are not authorized to view this post.");
          }
        } else {
          console.error("Failed to check authentication status");
          alert("An error occurred while checking authorization.");
        }
      } catch (error) {
        console.error("Error checking authorization:", error.message);
        alert("An error occurred while checking authorization.");
      }
    },

    backToPosts() {
      this.selectedPost = null;
    },

    async fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (response.ok) {
          this.posts = await response.json();
          console.log("Posts fetched:", this.posts);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    },

    resetAllLikes() {
      this.resetLikes();
      this.fetchPosts();
      console.log("Likes reset!");
    },

    async deleteAllPosts() {
      const confirmation = confirm(
        "Are you sure you want to delete all posts?"
      );
      if (!confirmation) return;

      try {
        const response = await fetch("http://localhost:3000/posts", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (response.ok) {
          alert("All posts deleted successfully!");
          this.fetchPosts();
        } else {
          console.error("Failed to delete posts");
          alert("Failed to delete posts from the database.");
        }
      } catch (error) {
        console.error("Error deleting posts:", error.message);
      }
    },

    async updatePost() {
      if (!this.selectedPost) return;

      const postId = this.selectedPost.postid;
      const token = localStorage.getItem("jwt");

      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ posttext: this.editedText }),
        });

        if (response.ok) {
          const updatedPost = await response.json();
          this.selectedPost = updatedPost;
          this.editedText = updatedPost.posttext;
          alert("Post updated successfully!");
        } else {
          const errorData = await response.json();
          console.error("Failed to update post:", errorData.error);
          alert(`Failed to update post: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error updating post:", error.message);
        alert("Error updating post.");
      }
    },

    async deletePost() {
      if (!this.selectedPost) return;

      const postId = this.selectedPost.postid;
      if (!confirm("Are you sure you want to delete this post?")) return;

      const token = localStorage.getItem("jwt");
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Post deleted successfully!");
          this.selectedPost = null;
          this.fetchPosts();
        } else {
          const errorData = await response.json();
          console.error("Failed to delete post:", errorData.error);
          alert(`Failed to delete post: ${errorData.error}`);
        }
      } catch (error) {
        console.error("Error deleting post:", error.message);
        alert("Error deleting post.");
      }
    },
  },

  mounted() {
    this.fetchPosts();
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
  background-color: #7a2828;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #8e3030;
}

.posts-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px; /* same as before */
}

.add-post-button {
  margin: 10px;
  background-color: #7a2828;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-post-button:hover {
  background-color: #8e3030;
}

.delete-all-button {
  margin: 10px;
  background-color: #7a2828;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.delete-all-button:hover {
  background-color: #a03d3d;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 10px auto;
  padding: 0 10px;
  box-sizing: border-box;
}

.styled-button {
  flex: 1;
  margin: 0 5px;
  background-color: #7a2828;
  color: white;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  min-width: 120px;
  white-space: nowrap;
}

.styled-button:hover {
  background-color: #a03d3d;
}

.post-details,
.posts-container {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  width: 90%;
  max-width: 600px;
  box-sizing: border-box;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

/* Make all these action buttons the same as the back button */
.post-action-button {
  background-color: #7a2828;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
}

.post-action-button:hover {
  background-color: #8e3030;
}
</style>
