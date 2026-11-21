<template>
  <section class="box box--contact contact">
    <div class="contact__text">
      <h2 class="contact__label">shortly</h2>
      <p>
        I’m a self-taught developer who always picking up new tools and technologies,
        enjoy problem-solving, building web apps that are fast, reliable, and easy to use
      </p>
      <p>
        I’m currently looking for a junior developer role where I can grow and ship
        real features with a team
      </p>
      <!-- TODO: point to the CV PDF (e.g. /cv.pdf in public/) once it exists -->
      <p class="contact__strong">
        check my <a class="accent accent--underline" href="#" target="_blank" rel="noreferrer">CV</a>
      </p>
      <p class="contact__strong">
        If you’d like to chat, share ideas, or talk about an opportunity, feel free to
        <a class="accent" href="#contact-form" @click.prevent="focusForm">contact me</a>
      </p>
    </div>

    <!-- Sending is not wired up yet: submit is prevented and nothing leaves the page. -->
    <form id="contact-form" class="contact__form" @submit.prevent>
      <h2 class="contact__form-title">..or you can write me here</h2>
      <input ref="nameInput" type="text" name="name" placeholder="Name" aria-label="Name" />
      <input type="email" name="email" placeholder="Email" aria-label="Email" />
      <textarea name="message" rows="4" placeholder="Text" aria-label="Text"></textarea>
      <button type="submit">send</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";

const nameInput = ref(null);

function focusForm() {
  nameInput.value?.scrollIntoView({ behavior: "smooth", block: "center" });
  nameInput.value?.focus({ preventScroll: true });
}
</script>

<style lang="scss" scoped>
@use "../assets/css/mixins" as *;

.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  padding-block: 5rem;

  @include mq(md) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    padding-block: 3rem;
  }
}

.contact__text {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  font-size: clamp(1rem, 1.3vw, 1.1rem);
  line-height: 1.45;
}

.contact__label {
  font-size: 0.95rem;
  font-weight: normal;
  margin-bottom: -0.75rem;
}

.contact__strong {
  font-weight: 700;
}

.accent {
  color: var(--gold);
  font-weight: 700;
  text-decoration: none;
  &:hover { opacity: 0.75; }
}

.accent--underline {
  text-decoration: underline;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input,
  textarea {
    width: 100%;
    border: none;
    background: var(--white);
    color: var(--brown);
    font: inherit;
    font-size: 0.95rem;
    padding: 0.9rem 1.25rem;
    border-radius: 999px;

    &::placeholder { color: #a9a3a3; }
    &:focus { outline: 2px solid var(--gold); }
  }

  textarea {
    border-radius: 2.5rem;
    min-height: 6rem;
    resize: none;
  }

  button {
    align-self: center;
    width: min(100%, 12rem);
    padding: 0.6rem 1rem;
    border: none;
    border-radius: 999px;
    background: var(--gold);
    color: var(--white);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    &:hover { opacity: 0.85; }
  }
}

.contact__form-title {
  @include title-text(1.15rem);
  color: var(--gold);
  font-weight: normal;
  text-align: center;
}
</style>
