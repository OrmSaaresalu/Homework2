import { createStore } from "vuex";

export default createStore({
  state: () => ({
    posts: [],
  }),

  getters: {
    postById: (state) => (id) => state.posts.find((post) => post.id === id),
  },

  mutations: {
    SET_POSTS(state, posts) {
      state.posts = posts;
    },

    LIKE_POST(state, id) {
      const post = state.posts.find((p) => p.id === id);
      if (post) {
        post.likes++;
      }
    },

    RESET_LIKES(state) {
      state.posts.forEach((post) => {
        post.likes = 0;
      });
    },
  },

  actions: {
    async fetchPosts({ commit }) {
      const response = await fetch(`${import.meta.env.BASE_URL}data/posts.json`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const posts = await response.json();
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      commit("SET_POSTS", posts);
    },
  },
});
