<template>
    <div :class="['todo-item', priorityClass]">
      <span>{{ item.text }}</span>
      <div class="actions">
        <button @click="$emit('edit', item)">Edit</button>
        <button @click="$emit('remove', item)">Remove</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['item'],
    computed: {
      priorityClass() {
        return `priority-${this.item.priority}`;
      },
    },
  };
  </script>
  
  <style scoped>
  .todo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
  
  .priority-critical {
    border-left: 5px solid red;
  }
  
  .priority-moderate {
    border-left: 5px solid orange;
  }
  
  .priority-optional {
    border-left: 5px solid green;
  }
  
  .actions button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
  }
  
  .actions button:hover {
    background-color: #0056b3;
  }
  </style>
  