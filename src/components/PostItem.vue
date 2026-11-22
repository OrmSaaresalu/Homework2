<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  id: { type: Number, required: true },
});

const store = useStore();
const post = computed(() => store.getters.postById(props.id));

const formattedDate = computed(() =>
  new Date(post.value.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }),
);
</script>

<template>
  <article v-if="post" class="post">
    <h2 class="hidden">Post {{ post.id }}</h2>

    <header>
      <span class="avatar" :title="post.author"></span>
      <span class="author">{{ post.author }}</span>
      <time :datetime="post.createdAt">{{ formattedDate }}</time>
    </header>

    <img v-if="post.image" :src="post.image" :alt="post.imageAlt ?? ''" />

    <p>{{ post.text }}</p>
  </article>
</template>

<style scoped>
.post {
  background: #d9d9d9;
  border-radius: 8px;
  padding: 10px;
}

.post > header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #888;
  display: inline-block;
}

.post img {
  width: 100%;
  border-radius: 4px;
  margin-top: 8px;
}

.post img + p {
  font-weight: bold;
}

.hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>