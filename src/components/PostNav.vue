<template>
  <div class="postNav">
    <img :src="pfp" :alt="pfpAlt" class="pfp" />
    <p class="post-date">{{ postedDate }}</p>
  </div>
</template>

<script>
export default {
  name: "PostNav",
  props: {
    pfp: String,
    pfpAlt: String,
    postedDate: String,
  },
};
</script>

<style scoped>
.postNav {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #333;
  color: white;
  height: 10%;
  align-items: center;
}

.postNav > img {
  width: 70px;
  height: 70px;
  border-radius: 100%;
}

.postNav > p {
  color: white;
  font-size: 1.2em;
  display: flex;
}
</style>
