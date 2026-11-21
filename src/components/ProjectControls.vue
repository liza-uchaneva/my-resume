<template>
  <!-- Pinned to the corner of the projects box while the list is open. -->
  <nav class="project-controls" aria-label="Project list controls">
    <button ref="lessBtn" type="button" class="pill" aria-expanded="true" aria-label="Show fewer projects" @click="emit('less')">
      see less
    </button>
    <button type="button" class="round" aria-label="Go to first project" @click="emit('first')">↑</button>
    <button type="button" class="round" aria-label="Go to last project" @click="emit('last')">↓</button>
  </nav>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["less", "first", "last"]);
const lessBtn = ref(null);

defineExpose({
  focusLess: () => lessBtn.value?.focus({ preventScroll: true }),
});
</script>

<style lang="scss" scoped>
.project-controls {
  position: sticky;
  bottom: 1.5rem;
  align-self: flex-end;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  view-transition-name: project-controls;
}

button {
  border: none;
  background: var(--white);
  color: var(--brown);
  font: inherit;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(59, 43, 44, 0.3);
  transition: transform 0.2s ease;

  &:hover { transform: translateY(-2px); }
  &:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
}

.pill {
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
}

.round {
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  font-size: 1rem;
  line-height: 1;
}
</style>
