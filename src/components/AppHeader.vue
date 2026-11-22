<template>
  <header class="site-header">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/signup">Signup</router-link>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  background: #c0c0c0;
  padding: 10px 15px;
  border-radius: 8px;
  margin: 10px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.15);
}

nav {
  display: flex;
  gap: 5px;
}

nav a {
  color: #000;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 4px;
  transition: background 0.15s, color 0.15s;
}

nav a:hover,
nav a.router-link-exact-active {
  background: #1f497d;
  color: #fff;
}
</style>
