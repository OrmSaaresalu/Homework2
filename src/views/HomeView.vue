<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import PostItem from "../components/PostItem.vue";

const store = useStore();
const status = ref("Loading posts...");

onMounted(async () => {
  // Only fetch once. Fetching again on every visit would overwrite likes.
  if (store.state.posts.length > 0) return;

  try {
    await store.dispatch("fetchPosts");
  } catch (error) {
    console.error("Failed to load posts:", error);
    status.value = "Could not load posts.";
  }
});
</script>

<template>
  <section class="home">
    <h1 class="hidden">PostIt</h1>
    <aside class="side"></aside>

    <div class="content">
      <p v-if="store.state.posts.length === 0">{{ status }}</p>
      <PostItem v-for="post in store.state.posts" :key="post.id" :id="post.id" />
      <button
        v-if="store.state.posts.length > 0"
        class="reset-likes"
        type="button"
        @click="store.commit('RESET_LIKES')"
      >
        Reset likes
      </button>
    </div>

    <aside class="side"></aside>
  </section>
</template>

<style scoped>
.home {
  display: flex;
  gap: 10px;
}

.side {
  flex: 1;
  background: #bbb;
  border-radius: 8px;
}

.content {
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}

.reset-likes {
  align-self: center;
  padding: 6px 18px;
  margin-bottom: 10px;
  border: none;
  border-radius: 999px;
  background: #1f497d;
  color: #fff;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s;
}

.reset-likes:hover {
  background: #2c63a8;
}

@media (max-width: 600px) {
  .side {
    display: none;
  }
  .content {
    flex: 1;
  }
}
</style>
