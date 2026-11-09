<template>
  <header class="header">
    <div class="header__wrapper">
      <router-link class="name" to="/"><h1>ELIZAVETA UCHANEVA</h1></router-link>
      <div class="role">
        <h3>software</h3>
        <h3>engineer</h3>
      </div>
      <nav>
        <div class="menu">
          <router-link to="/">INFO</router-link>
          <!-- <router-link to="/blog">BLOG</router-link> -->
          <router-link to="/projects">PROJECTS</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<style lang="scss" scoped></style>