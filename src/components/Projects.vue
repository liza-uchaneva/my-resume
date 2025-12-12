<template>
    <section>
        <div><a href="/projects">see more works →</a></div>
        <div class="projects">
          <div class="project-wrap">
            <a><img class ="project-img"src="../assets/img/projects/Pebble.png"></img></a>
            <a href="https://apps.rebble.io/en_US/application/691cc106f5dd2700091a4fe2">facewatch</a>
          </div>
          <div class="project-wrap">
            <a><img class ="project-img"src="../assets/img/projects/ghost.png"></img></a>
            <a href="https://liza-uchaneva.github.io/GhostGame/">ghostgame</a>
          </div>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<style lang="scss" scoped></style>