<template>
  <footer class="site-footer">
    <ul class="site-footer__links">
      <li v-for="l in links" :key="l.label">
        <a :href="l.href" target="_blank" rel="noreferrer">{{ l.label }}</a>
      </li>
    </ul>
    <a class="site-footer__email" :href="`mailto:${email}`">{{ email }}</a>
  </footer>
</template>

<script setup>
import links, { email } from "../data/links.js";
</script>

<style lang="scss" scoped>
@use "../assets/css/mixins" as *;

.site-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  padding: 2.5rem 0.75rem 2rem;
  font-weight: 700;
  font-size: 0.8rem;

  @include mq(md) {
    flex-direction: column;
  }
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 2rem;

  a {
    font-size: inherit;
    letter-spacing: 0.12em;
  }
}

.site-footer__email {
  font-size: inherit;
  text-decoration: none;
}
</style>
