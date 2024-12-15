<template>
  <div>
    <Header></Header>
    <Sidebars></Sidebars>
    <main>
      <div v-if="selectedPost" class="post-details">
        <h1>Post Details</h1>
        <img 
          :src="selectedPost.postimage" 
          :alt="selectedPost.posttext" 
          class="post-image"
        />
        <h2>{{ selectedPost.posttext }}</h2>
        <p>Author: {{ selectedPost.postauthorname }}</p>
        <p>
          Posted on:
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
        <p>Likes: {{ selectedPost.likes || 0 }}</p>
        <button @click="backToPosts" class="back-button">Back to Posts</button>
    </div>

      
      <div v-else class="posts-container">
        <button @click="$router.push('/addpost')" class="add-post-button">Add Post</button>
        
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
          <!-- Здесь вызывается PostNav -->
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
      <button @click="deleteAllPosts" class="styled-button">Delete All Posts</button>
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
    };
  },

  computed: {
    ...mapGetters(["allPosts"]),// Maps the `allPosts` getter from Vuex
    posts() {
      return this.posts.length > 0 ? this.posts : this.allPosts; 
  },
  },
  methods: {
    ...mapMutations(["incrementLikes", "resetLikes"]),
    incrementLikes(postID) {
      const post = this.posts.find((p) => p.postid === postID);
      if (post) {
        post.likes = (post.likes || 0) + 1;
      }
    },
    selectPost(post) {
      console.log("Selected Post:", post); 
      this.selectedPost = post; 
    },
    backToPosts() {
      this.selectedPost = null; 
    },
    async fetchPosts() {
      try {
        const response = await fetch("http://localhost:3000/posts");
        if (response.ok) {
          this.posts = await response.json();
          console.log("Posts fetched:", this.posts); // Лог для проверки данных
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    },
    resetAllLikes() {
      this.resetLikes(); // Вызов мутации из Vuex
      this.fetchPosts(); // Обновляем локальные посты после сброса лайков
      console.log("Likes reset!");
    },

    async deleteAllPosts() {
      const confirmation = confirm("Are you sure you want to delete all posts?");
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
  },

  mounted() {
  this.fetchPosts(); // Загружаем посты при монтировании компонента
  } 



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
  background-color: #7a2828;;
  border-radius: .25rem;
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
  max-width: 400px;
}

.back-button {
  display: block; 
  margin: 20px auto; 
  width: 200px; 
  background-color: #7a2828; 
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
}

.back-button:hover {
  background-color: #8e3030;
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

@media (max-width: 768px) {
  .button-container {
    flex-direction: column; 
    gap: 10px; 
  }

  .styled-button {
    width: 100%; 
  }
}


.posts-container, .post-details {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  width: 90%;
  max-width: 600px;
  box-sizing: border-box;
}

</style>
