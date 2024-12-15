<template>
  <div class="container">
    <div class="post-container">
      <form @submit.prevent="submitPost">
        <div class="form-group">
          <label for="post-body">Post body</label>
          <textarea
            id="post-body"
            v-model="body"
            name="post-body"
            rows="4"
            cols="30"
            placeholder="Write your post here..."
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="file-upload">Select file</label>
          <input
            type="file"
            id="file-upload"
            @change="handleFileUpload"
            accept="image/*"
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPostForm",
  data() {
    return {
      body: "",
      file: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async submitPost() {
      try {
        if (!this.body) {
          alert("Post body is required.");
          return;
        }

        const formData = new FormData();
        formData.append("body", this.body);
        if (this.file) {
          formData.append("file", this.file);
        }

        const response = await fetch("http://localhost:3000/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`, // Только JWT
          },
          body: formData,
        });


        if (response.ok) {
          alert("Post created successfully!");
          this.$router.push("/"); // Возвращаемся на главную страницу
        } else {
          const error = await response.json();
          console.error("Failed to create post:", error.message);
          alert(`Failed to create post: ${error.message}`);
        }
      } catch (error) {
        console.error("Error creating post:", error.message);
        alert("An error occurred while creating the post.");
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

form {
  background-color: #f0f0f0;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group > label {
  font-weight: bold;
  margin-bottom: 5px;
}

textarea,
input[type="file"] {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
}

button {
  padding: 10px;
  background-color: #7a2828;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #8e3030;
}
</style>
