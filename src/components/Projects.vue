<template>
  <div>
    <div v-if="show" class="see-more">
      <router-link to="/projects">see more works →</router-link>
    </div>

    <div class="projects" :class="{ 'projects--row': show }">
      <template v-if="show">
        <div class="project-wrap" v-for="p in visibleProjects" :key="p.title">
          <a :href="p.demo" target="_blank" rel="noreferrer">
            <img class="project-img" :src="p.img" :alt="p.title" />
          </a>

          <a :href="p.demo" target="_blank" rel="noreferrer">
            {{ p.title }}
          </a>
        </div>
      </template>

      <template v-else>
        <article class="project-card" v-for="p in visibleProjects" :key="p.title">
          <a :href="p.demo" target="_blank" rel="noreferrer">
            <img class="project-img" :src="p.img" :alt="p.title" />
          </a>

          <a class="project-title" :href="p.demo" target="_blank" rel="noreferrer">
            {{ p.title }}
          </a>

          <p class="project-desc">{{ p.description }}</p>
          <p v-if="p.learned" class="project-learned">{{ p.learned }}</p>

          <ul class="project-tags">
            <li v-for="t in p.tech" :key="t">{{ t }}</li>
          </ul>

          <div class="project-links">
            <a :href="p.demo" target="_blank" rel="noreferrer">live demo ↗</a>
            <a :href="p.source" target="_blank" rel="noreferrer">source ↗</a>
          </div>
        </article>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import projects from "../data/projects.js";

const props = defineProps({
  limit: { type: Number, default: Infinity },
  show: { type: Boolean, default: false },
});

const visibleProjects = computed(() => projects.slice(0, props.limit));
</script>

<style lang="scss" scoped></style>
