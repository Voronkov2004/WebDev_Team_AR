<template>
<div class = container>
  <div class="post-container">
    <form id="add-post-form" action="index.html" method="GET">
      <div class="form-group">
        <label for="post-body">Post body</label>
        <textarea id="post-body" name="post-body" rows="4" cols="30"></textarea>
      </div>
      <div class="form-group">
        <label for="file-upload">Select file</label>
        <input type="file" id="file-upload" name="file-upload" />
      </div>
      <button type="submit">Create post</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: "AddPostForm",
};
</script>

<style>

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
  justify-content: space-between;
  align-items: center;
}

.form-group > label {
  font-weight: bold;
}

label {
  font-size: 16px;
}

textarea,
input[type="file"] {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 70%;
}

textarea + button {
  margin-top: 20px;
}

textarea ~ input[type="file"] {
  margin-top: 10;
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

@media (max-width: 600px) {
  .navbar {
    flex-direction: column;
    align-items: center;
  }

  form {
    width: 90%;
  }
}
</style>
