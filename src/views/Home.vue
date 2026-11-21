<template>
  <main class="page">
    <HeroBox />
    <ProjectsBox />
    <ContactBox />
  </main>
  <SiteFooter />
</template>

<script setup>
import HeroBox from "../components/HeroBox.vue";
import ProjectsBox from "../components/ProjectsBox.vue";
import ContactBox from "../components/ContactBox.vue";
import SiteFooter from "../components/SiteFooter.vue";
import { useScrollBackground } from "../composables/useScrollBackground";

useScrollBackground();
</script>
