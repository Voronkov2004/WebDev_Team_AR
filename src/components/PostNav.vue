<template>
  <div class="postNav">
    <!-- Only render the pfp image if pfp is truthy -->
    <img v-if="pfp" :src="pfp" :alt="pfpAlt" class="pfp" />
    <p class="postCreated">
      {{
        postedDate
          ? new Date(postedDate).toLocaleString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : "Date Not Available"
      }}
    </p>
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
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.postNav > p {
  color: white;
  font-size: 1.2em;
  display: flex;
}
</style>
