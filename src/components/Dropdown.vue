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
      <a href="logout.html">Logout</a>
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
  },
  mounted() {
    document.addEventListener("click", this.hideDropdown);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.hideDropdown);
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
</style>
