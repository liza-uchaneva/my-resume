<template>
  <div>
    <div v-if="show" class="see-more">
      <a href="/projects">see more works →</a>
    </div>

    <div class="projects">
      <div class="project-wrap" v-for="p in visibleProjects" :key="p.title">
        <a :href="p.href" target="_blank" rel="noreferrer">
          <img class="project-img" :src="p.img" :alt="p.title" />
        </a>

        <a :href="p.href" target="_blank" rel="noreferrer">
          {{ p.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  limit: { type: Number, default: Infinity },
  show: { type: Boolean, default: false },
});

const projects = [
  {
    title: "facewatch",
    href: "https://apps.rebble.io/en_US/application/691cc106f5dd2700091a4fe2",
    img: new URL("../assets/img/projects/Pebble.png", import.meta.url).href,
  },
  {
    title: "ghostgame",
    href: "https://liza-uchaneva.github.io/GhostGame/",
    img: new URL("../assets/img/projects/ghost.png", import.meta.url).href,
  },
  {
    title: "landing",
    href: "https://github.com/AnnaMaximenko/africa",
    img: new URL("../assets/img/projects/landing.png", import.meta.url).href,
  },
  {
    title: "weather API",
    href: "https://liza-uchaneva.github.io/WeatherApp_TheOdinProject-/",
    img: new URL("../assets/img/projects/weather.jpg", import.meta.url).href,
  },
  {
    title: "restaurant",
    href: "https://liza-uchaneva.github.io/RestaurantPage_TheOdinProject/",
    img: new URL("../assets/img/projects/rest.jpg", import.meta.url).href,
  },
  {
    title: "library",
    href: "https://liza-uchaneva.github.io/Library_TheOdinProject/",
    img: new URL("../assets/img/projects/library.png", import.meta.url).href,
  },
];

const visibleProjects = computed(() => projects.slice(0, props.limit));
</script>

<style lang="scss" scoped></style>