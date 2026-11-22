<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <p>&copy; {{ year }} PostIt. All rights reserved.</p>
    <p>University of Tartu &middot; Web Application Development</p>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #c0c0c0;
  text-align: center;
  padding: 12px;
  border-radius: 8px;
  margin: 10px;
}

.site-footer p {
  margin: 4px 0;
}
</style>