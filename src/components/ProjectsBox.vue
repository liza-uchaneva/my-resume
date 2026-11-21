<template>
  <section ref="boxEl" class="box box--projects projects-box">
    <p v-if="!expanded" class="projects-box__stack">
      I build web apps with <b>Vue</b>, <b>TypeScript</b>, and <b>JavaScript</b> on the
      front end and <b>.NET</b> and <b>Ruby on Rails</b> on the back end, with
      <b>SQL databases</b>.
    </p>

    <!-- The same card elements are used in both layouts so the view transition
         can slide each one from the stack into the list and back. -->
    <div class="cards" :class="expanded ? 'cards--list' : 'cards--stack'">
      <div v-for="(p, i) in visible" :key="p.title" class="project-row" data-project-row>
        <a
          class="card"
          :style="{ viewTransitionName: `project-${i}` }"
          :href="p.demo"
          target="_blank"
          rel="noreferrer"
          :title="p.title"
        >
          <img :src="p.img" :alt="p.title" loading="lazy" />
        </a>

        <div v-if="expanded" class="project-details">
          <ul class="project-tags">
            <li v-for="t in p.tech" :key="t">{{ t }}</li>
          </ul>
          <p class="project-desc">{{ p.description }}</p>
          <div class="project-links">
            <a :href="p.source" target="_blank" rel="noreferrer">source↗</a>
            <a :href="p.demo" target="_blank" rel="noreferrer">demo↗</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Collapsed: GitHub line bottom-left, "see more" bottom-right.
         Expanded: GitHub line centered under the list. -->
    <div class="projects-box__bottom" :class="{ 'projects-box__bottom--open': expanded }">
      <p class="projects-box__more">
        you can find more projects on
        <a href="https://github.com/liza-uchaneva" target="_blank" rel="noreferrer">GitHub</a>
      </p>
      <button
        v-if="!expanded"
        ref="seeMoreBtn"
        class="see-more"
        type="button"
        aria-expanded="false"
        @click="expand"
      >
        see more →
      </button>
    </div>

    <ProjectControls v-if="expanded" ref="controls" @less="collapse" @first="goTo('first')" @last="goTo('last')" />
  </section>
</template>

<script setup>
import { ref, nextTick } from "vue";
import projects from "../data/projects.js";
import { withViewTransition, scrollBehavior } from "../utils/viewTransition";
import ProjectControls from "./ProjectControls.vue";

import { computed } from "vue";

// Collapsed: only the featured projects, as the overlapping stack.
// Expanded: every project (featured ones first, so their cards keep their
// view-transition names and slide; the rest fade in below them).
const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);
const visible = computed(() => (expanded.value ? [...featured, ...others] : featured));

const expanded = ref(false);
const boxEl = ref(null);
const seeMoreBtn = ref(null);
const controls = ref(null);

// afterUpdate runs inside the transition, so any scroll it does is part of the
// "new" snapshot and the cards animate straight to where the user will see them.
function setExpanded(next, afterUpdate) {
  return withViewTransition(async () => {
    expanded.value = next;
    await nextTick();
    afterUpdate?.();
  });
}

// The button that was clicked disappears in each direction, so move keyboard
// focus to its counterpart instead of letting it fall back to <body>.
function expand() {
  setExpanded(true, () => controls.value?.focusLess());
}

function collapse() {
  setExpanded(false, () => {
    seeMoreBtn.value?.focus({ preventScroll: true });
    // Land just above the box so its rounded top edge is visible.
    const top = boxEl.value.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top, behavior: "instant" });
  });
}

function goTo(which) {
  const rows = boxEl.value?.querySelectorAll("[data-project-row]") ?? [];
  const row = which === "first" ? rows[0] : rows[rows.length - 1];
  row?.scrollIntoView({ block: "center", behavior: scrollBehavior() });
}
</script>

<style lang="scss" scoped>
@use "../assets/css/mixins" as *;

.projects-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}

.projects-box__stack {
  view-transition-name: projects-stack-text; // slides with the layout instead of cross-fading
  max-width: 22rem;
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.45;
}

.cards {
  container-type: inline-size;
  padding-block: 0.5rem;
}

.card {
  --w: min(30rem, calc(100cqi / 2.5));
  flex: 0 0 var(--w);
  width: var(--w);
  aspect-ratio: 2 / 1; // same short, wide shape in the stack and in the list
  position: relative;
  display: block;
  border: clamp(2px, 0.4cqi, 4px) solid var(--white);
  border-radius: calc(var(--w) * 0.16);
  overflow: hidden;
  box-shadow: -12px 10px 28px rgba(59, 43, 44, 0.35);
  transition: transform 0.25s ease;

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

// Collapsed: overlapping cards, each covering half of the previous one.
// Rows use display: contents so the cards sit directly in the flex row.
.cards--stack {
  display: flex;
  justify-content: center;

  .project-row {
    display: contents;
  }

  .project-row + .project-row .card {
    margin-left: calc(var(--w) * -0.5);
  }

  // Phones: overlap more so each card can be bigger (about a third of each
  // covered card stays visible).
  @include mq(md) {
    .card {
      --w: calc(100cqi / 1.9);
    }

    .project-row + .project-row .card {
      margin-left: calc(var(--w) * -0.7);
    }
  }
}

// Expanded: one row per project, card on the left, details on the right.
.cards--list {
  display: flex;
  flex-direction: column;
  gap: 3rem;

  .project-row {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: clamp(1.5rem, 5cqi, 4rem);
    padding-left: clamp(0rem, 6cqi, 5rem);
  }

  .card {
    --w: min(30rem, calc(100cqi * 0.42));
  }

  @include mq(md) {
    .project-row {
      grid-template-columns: 1fr;
      justify-items: center;
      padding-left: 0;
      gap: 1.25rem;
    }

    .card {
      --w: 100cqi;
    }
  }
}

.project-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 28rem;
  animation: details-in 0.45s ease 0.35s both;
}

@keyframes details-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

.project-tags {
  @include list-reset;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;

  li {
    background: var(--white);
    color: var(--brown);
    border-radius: 999px;
    padding: 0.2rem 0.75rem;
    font-size: 0.8rem;
  }
}

.project-desc {
  text-align: center;
  line-height: 1.5;
}

.project-links {
  display: flex;
  gap: 0.75rem;

  a {
    font-weight: 700;
    text-decoration: underline;
  }
}

.projects-box__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.projects-box__bottom--open {
  justify-content: center;
}

.see-more {
  background: none;
  border: none;
  color: inherit;
  font: inherit;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s ease;
  &:hover { color: var(--gold); }
}

.projects-box__more {
  font-weight: 700;
  font-size: 0.9rem;

  a {
    font-size: inherit;
    text-decoration: underline;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-details { animation: none; }
}
</style>

<style>
/* View transition timing for the cards sliding between layouts (global: these
   pseudo-elements live on the document, not inside the component). */
::view-transition-group(*) {
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
