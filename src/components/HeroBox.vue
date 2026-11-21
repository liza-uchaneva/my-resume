<template>
  <section class="box box--hero hero">
    <div class="hero__text">
      <h1 class="hero__title"><b>Hi!</b></h1>
      <p>
        I’m <i>Liza</i>, a full-stack developer based in <i>Los Angeles</i>.<br>
        I love building fast, secure, and scalable web applications.
      </p>
    </div>

    <div class="hero__side">
      <ul class="hero__links">
        <li v-for="l in links" :key="l.label">
          <a :href="l.href" target="_blank" rel="noreferrer">{{ l.label }}</a>
        </li>
      </ul>

      <img class="hero__photo" src="../assets/img/main.jpg" alt="Lisa Uchaneva" />

      <a class="hero__email" :href="`mailto:${email}`">{{ email }}</a>
    </div>
  </section>
</template>

<script setup>
import links, { email } from "../data/links.js";
</script>

<style lang="scss" scoped>
@use "../assets/css/mixins" as *;

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  align-content: center;
  gap: 2rem;
  padding-top: 2.5rem;

  @include mq(md) {
    grid-template-columns: 1fr;
  }
}

.hero__title {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: normal;
  line-height: 1;
  margin-bottom: 0.75rem;
}

.hero__text p {
  font-size: clamp(1rem, 1.4vw, 1.2rem);
  line-height: 1.5;
  max-width: 32rem;
}

.hero__side {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "links photo"
    ".     photo"
    "email email";
  row-gap: 1.5rem;

  @include mq(md) {
    order: -1;
    grid-template-columns: 1fr;
    grid-template-areas: "photo" "links" "email";
    justify-items: center;
  }
}

.hero__links {
  grid-area: links;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    font-size: 1rem;
    letter-spacing: 0.03em;
  }

  @include mq(md) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
}

.hero__photo {
  grid-area: photo;
  justify-self: flex-start;
  width: min(100%, 25rem);
  aspect-ratio: 1;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 30%;
  box-shadow: 0 12px 30px rgba(59, 43, 44, 0.22); // lifts the photo slightly off the box
  margin-top: 2.5rem;
  margin-left: 2.5rem;

  @include mq(md) {
    justify-self: center;
    width: min(70%, 14rem);
    margin-top: 0;
  }
}

.hero__email {
  grid-area: email;
  font-size: 1rem;
  text-decoration: none;
}
</style>
