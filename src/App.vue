<template>
  <div id="app">
    <h1>To-Do List</h1>
    <TodoList />
  </div>

</template>

<script>
import TodoList from '/src/components/TodoList.vue';

export default {
  name: 'App',
  components: { TodoList }
};
</script>
<style scoped>
/* Global styles */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

</style>

