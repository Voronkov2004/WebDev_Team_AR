<template>
  <div class="postNav">
    <img :src="pfp" :alt="pfpAlt" class="pfp" />
    <p class="postCreated">
      <!-- Проверяем дату и форматируем -->
      {{
        postedDate
          ? new Date(postedDate).toLocaleString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            })
          : "Date Not Available"
      }}
    </p>
  </div>
</template>  //Отображает навигацию с аватаром автора и датой публикации.




<script>
export default {
  name: "PostNav",
  props: {
    pfp: String, // URL аватара.
    pfpAlt: String, // Альтернативный текст для аватара.
    postedDate: String, // Дата публикации поста.
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
