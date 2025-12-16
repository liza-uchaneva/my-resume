<template>
  <header id="app" class="header">
    <div class="header__wrapper">
      <a class="name" href="/"><h1>ELIZAVETA UCHANEVA</h1></a>
      <div>
        <h3>software</h3>
        <h3>engineer</h3>
      </div>
      <nav>
        <div class="menu">
          <a href="/">INFO</a>
          <!-- <a href="/blog">BLOG</a> -->
          <a href="/projects">PROJECTS</a>
        </div>
      </nav>
      <h3>2025</h3>
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