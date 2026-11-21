<template>
  <section class="box box--hero hero">
    <div class="hero__text">
      <h1 class="hero__title"><b><span class="hl hl--all">Hi!</span></b></h1>
      <p>
        <!-- Screen readers get the plain sentence; the letter spans are visual only. -->
        <span class="visually-hidden">My name is Liza, a full-stack developer from Los Angeles</span>
        <span aria-hidden="true"
          ><span
            v-for="l in letters"
            :key="l.index"
            class="hl"
            :class="{ 'hl--italic': l.italic }"
            :style="{ '--i': l.index }"
            >{{ l.char }}</span
          ></span
        ><br />
        Passionate about building fast, secure, and scalable web applications
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
import { toLetters } from "../utils/letters";

// Highlighted letter by letter at reading pace after "Hi!".
const letters = toLetters([
  { text: "My name is " },
  { text: "Liza", italic: true },
  { text: ", a full-stack developer from " },
  { text: "Los Angeles", italic: true },
]);
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

// Highlighter: a yellow marker sweeps in behind each letter; the text itself
// stays brown so it remains easy to read. "Hi!" is highlighted all at once,
// then the sentence follows letter by letter (~50ms each ≈ reading pace).
.hl {
  background: linear-gradient(var(--gold), var(--gold)) no-repeat left / 0% 100%;
  animation: hl-sweep 0.12s linear forwards;
  animation-delay: calc(0.9s + var(--i) * 50ms);
}

.hl--all {
  animation-duration: 0.35s;
  animation-delay: 0.4s;
}

.hl--italic {
  font-style: italic;
}

@keyframes hl-sweep {
  to { background-size: 100% 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .hl {
    animation: none;
    background-size: 100% 100%;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
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
  transition: color 0.2s ease;
  &:hover { color: var(--gold); }
}
</style>
