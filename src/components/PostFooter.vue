<template>
  <div class="postFooter">
    <h1>{{ textPost }}</h1>
    <p>Written by: {{ authorName }}</p>
    <div class="likeButton">
      <button @click="incrementLikes">Like</button>
      <span class="like-counter">Likes: {{ likes }}</span>
    </div>
  </div>
</template>  // Нижняя часть поста с кнопкой "лайк".



<script>
export default {
  name: "PostFooter",
  props: {
    textPost: String,
    authorName: String,
    likes: Number,
  },
  /*data() {
    return {
      likes: 0,
    };
  },*/
  methods: {
    incrementLikes() {
      this.$emit("increment-like"); // Увеличивает количество лайков (через родителя).
    },
  },
};
</script>

<style scoped>
.postFooter h1 {
  font-family: "Roboto", sans-serif; 
  font-size: 20px; 
  font-weight: 100; 
  color: #333; 
  text-align: center; 
  margin: 0px 0; 
}

.postFooter p {
  font-family: "Roboto", sans-serif; 
  font-size: 20px; 
  font-weight: 100; 
  color: #333;
  text-align: center; 
  margin: 0px 0; 
}


.postFooter {
  width: 100%;
  display: flex;
  align-items: center;

  flex-direction: column;
  margin-bottom: 30px;
  gap: 20px;
}
button {
  background-color: #333;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #555;
}
.likeButton {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.like-counter {
  font-size: 1.2em;
  color: #555;
}

</style>
