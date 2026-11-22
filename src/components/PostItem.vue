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

function like() {
  store.commit("LIKE_POST", props.id);
}
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

    <div class="actions">
      <button class="like" type="button" aria-label="Like post" @click="like">
        👍
      </button>
      <span class="like-count">
        {{ post.likes }} {{ post.likes === 1 ? "like" : "likes" }}
      </span>
    </div>
  </article>
</template>

<style scoped>
.post {
  background: #d9d9d9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.15);
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
  flex-shrink: 0;
}

.author {
  flex: 1;
  margin-left: 8px;
  font-weight: bold;
}

time {
  font-size: 0.85em;
}

.post img {
  width: 100%;
  border-radius: 4px;
  margin-top: 8px;
  display: block;
}

.post img + p {
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  transition: transform 0.1s;
}

.like:hover {
  transform: scale(1.2);
}

.like:active {
  transform: scale(0.95);
}

.hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
</style>
