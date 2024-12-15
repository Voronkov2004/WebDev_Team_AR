<template>
  <div class="dropdown">
    <img
      src="images/me.png"
      alt="Account Picture"
      class="profile-icon"
      @click.stop="toggleDropdown"
    />
    <div class="dropdown-menu" v-show="isDropdownVisible" @click.stop>
      <p>John Donkey</p>
      <p>farmer@ut.ee</p>
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDropdownVisible: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
    logout() {
    fetch('http://localhost:3000/auth/logout', {
      method: 'GET',
      credentials: 'include', // Удаляет cookie с JWT
    })
      .then(() => {
        localStorage.removeItem('jwt'); // Удалить JWT из локального хранилища
        this.$router.push('/login'); // Перенаправить пользователя на страницу входа
      })
      .catch((error) => {
        console.error('Logout failed:', error);
        alert('Failed to logout.');
      });
    },
  },
  /**
   * Lifecycle hook that runs when the component is mounted to the DOM.
   * Adds a global click event listener to hide the dropdown when clicking outside.
   */
  mounted() {
    document.addEventListener("click", this.hideDropdown); // Добавляет обработчик клика на документ.
  },
  /**
   * Lifecycle hook that runs before the component is destroyed.
   * Removes the global click event listener to prevent memory leaks.
   */
  beforeDestroy() {
    document.removeEventListener("click", this.hideDropdown); // Удаляет обработчик при удалении компонента.
  },

};
</script>

<style>
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  min-width: 150px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 15px;
  z-index: 1000;
}
.dropdown-menu p a {
  color: black;
  padding: 15px;
  text-decoration: none;
  display: block;
}

.dropdown-menu p {
  margin: 10px 0;
}

.dropdown-menu a {
  color: black;
  text-decoration: none;
}
.dropdown-menu[v-show] {
  display: block !important;
}
.profile-icon {
  cursor: pointer;
}

.logout-btn {
  background-color: #7a2828;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%; 
  text-align: center;
}

.logout-btn:hover {
  background-color: #8e3030;
}

</style>
