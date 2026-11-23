<template>
  <section class="box box--contact contact">
    <div class="contact__text">
      <h2 class="box-label contact__label">in short</h2>
      <p>
        I’m a self-taught developer who’s always picking up new tools and technologies.
        I enjoy solving problems and building web apps that are fast, reliable, and easy to use.
      </p>
      <p>
        I’m currently looking for a junior developer role where I can grow and ship
        real features as part of a team.
      </p>
      <p>
        Take a look at my
        <a class="accent accent--underline" :href="cvUrl" target="_blank" rel="noreferrer">CV</a>.
      </p>
      <p>
        If you’d like to chat, share ideas, or talk about an opportunity, feel free to
        <a class="accent" :href="`mailto:${email}`">contact me</a>.
      </p>
    </div>

    <!-- Sent through Web3Forms (see utils/contactForm.js). -->
    <form id="contact-form" class="contact__form" novalidate @submit.prevent="onSubmit">
      <h2 class="contact__form-title">…or write to me here</h2>

      <!-- Honeypot: hidden from people, but bots fill it in and Web3Forms drops the message. -->
      <input
        v-model="botcheck"
        class="contact__trap"
        type="checkbox"
        name="botcheck"
        tabindex="-1"
        autocomplete="off"
        aria-hidden="true"
      />

      <div v-for="f in fields" :key="f.name" class="contact__field">
        <component
          :is="f.tag"
          :id="`contact-${f.name}`"
          v-model="form[f.name]"
          :type="f.type"
          :name="f.name"
          :rows="f.tag === 'textarea' ? 4 : undefined"
          :placeholder="f.label"
          :aria-label="f.label"
          :autocomplete="f.autocomplete"
          :maxlength="LIMITS[f.name]"
          required
          :aria-invalid="!!errors[f.name]"
          :aria-describedby="errors[f.name] ? `contact-${f.name}-error` : undefined"
          @blur="touch(f.name)"
          @input="touched[f.name] && check()"
        />
        <p v-if="errors[f.name]" :id="`contact-${f.name}-error`" class="contact__error">
          {{ errors[f.name] }}
        </p>
      </div>

      <button type="submit" :disabled="status === 'sending'">
        {{ status === "sending" ? "sending…" : "send" }}
      </button>

      <p v-if="status === 'sent'" class="contact__status" role="status">
        Thanks — your message is on its way. I’ll get back to you soon!
      </p>
      <p v-else-if="status === 'error'" class="contact__status contact__status--error" role="alert">
        {{ sendError }}
      </p>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { email, web3formsKey } from "../data/links.js";
import { LIMITS, validate, send } from "../utils/contactForm.js";

const fields = [
  { name: "name", label: "Name", tag: "input", type: "text", autocomplete: "name" },
  { name: "email", label: "Email", tag: "input", type: "email", autocomplete: "email" },
  { name: "message", label: "Message", tag: "textarea", autocomplete: "off" },
];

const form = reactive({ name: "", email: "", message: "" });
const botcheck = ref(false);
const errors = ref({});
const touched = reactive({}); // only show a field's error once it has been left or submitted
const status = ref("idle"); // idle | sending | sent | error
const sendError = ref("");

function check() {
  const all = validate(form);
  errors.value = Object.fromEntries(Object.entries(all).filter(([k]) => touched[k]));
  return all;
}

function touch(name) {
  touched[name] = true;
  check();
}

async function onSubmit() {
  fields.forEach((f) => (touched[f.name] = true));
  const all = check();
  if (Object.keys(all).length) {
    document.getElementById(`contact-${Object.keys(all)[0]}`)?.focus();
    return;
  }

  status.value = "sending";
  try {
    await send({ ...form, botcheck: botcheck.value }, web3formsKey);
    status.value = "sent";
    Object.assign(form, { name: "", email: "", message: "" });
    Object.keys(touched).forEach((k) => delete touched[k]);
    errors.value = {};
  } catch (err) {
    sendError.value = err.message;
    status.value = "error";
  }
}

// The CV lives in public/, so it is served next to index.html (BASE_URL is /my-resume/).
const cvUrl = `${import.meta.env.BASE_URL}Elizaveta-Uchaneva-resume.pdf`;
</script>

<style lang="scss" scoped>
@use "../assets/css/mixins" as *;

.contact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  align-content: center;
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
  margin-bottom: -0.75rem;
}

.accent {
  color: var(--gold);
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
    color: var(--brown); // brown on gold reads at ~6:1 (white was 2.2:1)
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    &:hover { opacity: 0.85; }
    &:disabled { opacity: 0.6; cursor: wait; }
  }
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  [aria-invalid="true"] { outline: 2px solid #E8A39A; }
}

.contact__error {
  padding-left: 1.25rem;
  font-size: 0.85rem;
  color: #F2B8AF; // soft coral, readable on brown
}

// Off-screen rather than display:none, so naive bots still see and fill it.
.contact__trap {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.contact__status {
  text-align: center;
  font-size: 0.95rem;
  color: var(--gold);
}

.contact__status--error { color: #F2B8AF; }

.contact__form-title {
  @include title-text(1.15rem);
  color: var(--gold);
  font-weight: normal;
  text-align: center;
}
</style>
