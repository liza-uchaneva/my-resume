<template>
  <Header />
  <About />
  <Projects :limit="3" :show="true" />
</template>

<script>
import Header from "../components/Header.vue";
import About from "../components/About.vue";
import Projects from "../components/Projects.vue";

export default {
  components: {
    Header,
    About,
    Projects,
  },
};
</script>

<style lang="scss" scoped></style>