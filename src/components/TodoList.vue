<template>
    <div class="todo-list">
      <!-- Controls for adding to-do -->
      <div class="controls">
        <input v-model="newTodo.text" placeholder="Add a new item" class="input-text" />
        <select v-model="newTodo.priority" class="input-select">
          <option value="critical">Critical</option>
          <option value="moderate">Moderate</option>
          <option value="optional">Optional</option>
        </select>
        <button @click="addTodo" class="btn-add">Add</button>
        <button @click="clearList" class="btn-clear">Clear List</button>
        <button @click="toggleSortOrder" class="btn-sort">
          Sort ({{ sortOrder === 'asc' ? 'A Z' : 'Z to A' }})
        </button>
      </div>
  
      <!-- To-Do Items List -->
      <div v-for="item in sortedTodos" :key="item.id">
        <TodoItem :item="item" @edit="openEditModal(item)" @remove="removeTodo" />
      </div>
  
      <!-- Edit Modal -->
      <EditModal v-if="isEditModalVisible" 
                 :isVisible="isEditModalVisible" 
                 title="Edit To-Do Item" 
                 @close="closeEditModal" 
                 @save="saveEdit">
        <input v-model="editTodo.text" placeholder="Edit to-do" class="input-text" />
        <select v-model="editTodo.priority" class="input-select">
          <option value="critical">Critical</option>
          <option value="moderate">Moderate</option>
          <option value="optional">Optional</option>
        </select>
      </EditModal>
    </div>
  </template>
  
  <script>
  import TodoItem from './TodoItem.vue';
  import EditModal from './EditModal.vue';
  
  export default {
    components: { TodoItem, EditModal },
    data() {
      return {
        newTodo: { text: '', priority: 'optional' },
        todos: JSON.parse(localStorage.getItem('todos')) || [],
        isEditModalVisible: false,
        editTodo: null,
        sortOrder: 'asc',  // Add state to track sorting order
      };
    },
    computed: {
      sortedTodos() {
        const priorities = { critical: 1, moderate: 2, optional: 3 };
        
        return this.todos.slice().sort((a, b) => {
          if (this.sortOrder === 'asc') {
            return priorities[a.priority] - priorities[b.priority];
          } else {
            return priorities[b.priority] - priorities[a.priority];
          }
        });
      },
    },
    methods: {
      addTodo() {
        if (this.newTodo.text) {
          this.todos.push({ ...this.newTodo, id: Date.now() });
          this.saveTodos();
          this.newTodo = { text: '', priority: 'optional' };
        }
      },
      openEditModal(item) {
        this.editTodo = { ...item };
        this.isEditModalVisible = true;
      },
      closeEditModal() {
        this.isEditModalVisible = false;
        this.editTodo = null;
      },
      saveEdit() {
        const index = this.todos.findIndex(todo => todo.id === this.editTodo.id);
        if (index !== -1) {
          this.todos[index] = { ...this.editTodo };
          this.saveTodos();
          this.closeEditModal();
        }
      },
      removeTodo(item) {
        this.todos = this.todos.filter(todo => todo.id !== item.id);
        this.saveTodos();
      },
      clearList() {
        this.todos = [];
        this.saveTodos();
      },
      saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      toggleSortOrder() {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      }
    },
  };
  </script>
  
  <style scoped>
  /* Button styling for the sort button */
  .sorting-controls {
    margin: 10px 0;
    text-align: right;
  }
  
  .btn-sort {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-sort:hover {
    background-color: #0056b3;
  }
  
  /* Rest of the styling */
  </style>
  
  
  <style scoped>
.todo-list {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls {
  margin-bottom: 20px;
}

.input-text, .input-select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.btn-add, .btn-clear {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  background-color: #28a745;
  margin-right: 10px;
}

.btn-add:hover {
  background-color: #218838;
}

.btn-clear {
  background-color: #dc3545;
}

.btn-clear:hover {
  background-color: #c82333;
}
</style>