<template>
  <!-- Pinned to the corner of the projects box while the list is open. -->
  <div class="project-controls" role="group" aria-label="Project list controls">
    <button ref="lessBtn" type="button" aria-expanded="true" @click="emit('less')">see less</button>
    <button type="button" class="arrow" aria-label="Go to last project" @click="emit('last')">↓</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["less", "last"]);
const lessBtn = ref(null);

defineExpose({
  focusLess: () => lessBtn.value?.focus({ preventScroll: true }),
});
</script>

<style lang="scss" scoped>
@use "../assets/css/mixins" as *;

// Desktop: sits in the empty lane to the right of the project text (the list
// reserves that space), so it never covers anything.
.project-controls {
  position: sticky;
  bottom: 1.5rem;
  align-self: flex-end;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  view-transition-name: project-controls;

  // Phones have no spare lane: the controls become a slim bar in the box's
  // own color, so text scrolls behind it instead of under loose buttons.
  @include mq(md) {
    bottom: 0;
    align-self: stretch;
    justify-content: flex-end;
    margin-inline: -1.25rem;
    padding: 0.75rem 1.25rem;
    background: var(--mauve);
    box-shadow: 0 -10px 16px var(--mauve);
  }
}

// Plain text, styled like "see more →".
button {
  border: none;
  background: none;
  padding: 0.25rem;
  color: var(--white);
  font: inherit;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover { color: var(--gold); }
  &:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
}

.arrow {
  font-size: 1.1rem;
  line-height: 1;
}
</style>
