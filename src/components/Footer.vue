<template>
  <footer>
    <Logo />
    <a href="https://github.com/HeoSeongman" target="_blank">
      (c){{ new Date().getFullYear() }} HeoSeongman
    </a>
  </footer>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding: 70px;
  text-align: center;
  .logo {
    display: block;
    margin-bottom: 4px;
  }
}
</style>