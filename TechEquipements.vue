<script setup lang="ts">
import { onMounted } from 'vue';

interface TechItem {
  title: string;
  desc: string;
  src: string;
  alt: string;
}

const props = defineProps<{ items: TechItem[] }>();

onMounted(() => {
  const section = document.getElementById('tech-equipements');
  if (!section) return;

  const cards = Array.from(section.querySelectorAll('.tech-card'));
  cards.forEach((card, index) => card.classList.add(`reveal-stagger-${index}`));

  const activateReveal = () => section.classList.add('reveal-ready');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activateReveal();
          observerInstance.disconnect();
        }
      });
    }, { threshold: 0.25 });

    observer.observe(section);
  } else {
    activateReveal();
  }
});
</script>

<template>
  <section id="tech-equipements" class="tech-sec" aria-labelledby="tech-title">
    <div class="tech-bg" aria-hidden="true"></div>

    <header class="tech-head">
      <p class="tech-kicker">TECHNOLOGIE ET ÉQUIPEMENTS</p>
      <h2 id="tech-title" class="tech-title">
        La précision n’est pas un luxe, c’est notre standard.
      </h2>
      <span class="tech-underline" aria-hidden="true"></span>
    </header>

    <div class="tech-grid" role="list">
      <article
        v-for="(item, index) in props.items"
        :key="item.title"
        class="tech-card"
        role="listitem"
        tabindex="0"
        :class="`reveal-stagger-${index}`"
      >
        <div class="tech-media">
          <img :src="item.src" :alt="item.alt" loading="lazy" />
          <span class="light-sweep" aria-hidden="true"></span>
        </div>
        <div class="tech-body">
          <div class="tech-dot" aria-hidden="true"></div>
          <h3 class="tech-h3">{{ item.title }}</h3>
          <p class="tech-p">{{ item.desc }}</p>
        </div>
      </article>
    </div>

    <div class="tech-sep" aria-hidden="true"></div>
  </section>
</template>

<style scoped src="./tech-equipements.css"></style>
