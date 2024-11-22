<template>
  <aside class="leftSide"></aside>
  <aside class="rightSide"></aside>
</template>

<script>
export default {
  name: "Sidebars",
};
</script>

<style>
aside ~ main {
  margin-top: 90px;
  margin-left: calc(20% + 20px);
  margin-right: calc(20% + 20px);
  width: calc(60% - 40px);
  box-sizing: border-box;
}

header ~ aside.leftSide,
header ~ aside.rightSide {
  padding: 20px;
  position: fixed;
  background-color: #4a4a4a;
  width: 20%;
  height: 100vh;
  z-index: 5;
  top: 80px;
}
aside.leftSide {
  left: 0;
}

aside.rightSide {
  right: 0;
}
</style>
