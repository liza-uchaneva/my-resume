<template>
  <section class="box box--projects projects-box">
    <p class="projects-box__stack">
      I build web apps with <b>Vue</b>, <b>TypeScript</b>, and <b>JavaScript</b> on the
      front end and <b>.NET</b> and <b>Ruby on Rails</b> on the back end, with
      <b>SQL databases</b>.
    </p>

    <div class="cards">
      <a
        v-for="p in featured"
        :key="p.title"
        class="card"
        :href="p.demo"
        target="_blank"
        rel="noreferrer"
        :title="p.title"
      >
        <img :src="p.img" :alt="p.title" loading="lazy" />
      </a>
    </div>

    <!-- Expanding the project list comes later; the button is a placeholder for now. -->
    <button class="see-more" type="button">see more →</button>
  </section>
</template>

<script setup>
import projects from "../data/projects.js";

const featured = projects.filter((p) => p.featured);
</script>

<style lang="scss" scoped>
.projects-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

.projects-box__stack {
  max-width: 22rem;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.45;
}

// Overlapping cards: each card covers half of the previous one.
// Card width is derived from the row width so the four cards always fit.
.cards {
  container-type: inline-size;
  display: flex;
  padding-block: 0.5rem;
}

.card {
  --w: min(30rem, calc(100cqi / 2.5));
  flex: 0 0 var(--w);
  aspect-ratio: 4 / 3;
  position: relative;
  border: clamp(2px, 0.4cqi, 4px) solid var(--white);
  border-radius: calc(var(--w) * 0.16);
  overflow: hidden;
  box-shadow: -12px 10px 28px rgba(59, 43, 44, 0.35);
  transition: transform 0.25s ease;

  & + & {
    margin-left: calc(var(--w) * -0.5);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-8px);
  }
}

.see-more {
  align-self: flex-end;
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover { opacity: 0.7; }
}
</style>
