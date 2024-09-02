import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';

describe('TodoList.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoList, {
      data() {
        return {
          newTodo: { text: '', priority: 'optional' },
          todos: [],
          sortOrder: 'asc',
        };
      },
    });
  });

  it('Add', async () => {
    wrapper.setData({ newTodo: { text: 'New Todo', priority: 'moderate' } });
    await wrapper.find('.btn-add').trigger('click');
    expect(wrapper.vm.todos).toHaveLength(1);
    expect(wrapper.vm.todos[0].text).toBe('New Todo');
  });

  it('Remove', async () => {
    wrapper.setData({ todos: [{ id: 1, text: 'Existing Todo', priority: 'optional' }] });
    wrapper.vm.removeTodo({ id: 1 });
    expect(wrapper.vm.todos).toHaveLength(0);
  });

  it('Sorting', async () => {
    expect(wrapper.vm.sortOrder).toBe('asc');
    await wrapper.vm.toggleSortOrder();
    expect(wrapper.vm.sortOrder).toBe('desc');
  });

  it('sorts todos by priority', async () => {
    wrapper.setData({
      todos: [
        { id: 1, text: 'Critical Task', priority: 'critical' },
        { id: 2, text: 'Optional Task', priority: 'optional' },
      ],
    });

    const sortedTodosAsc = wrapper.vm.sortedTodos;
    expect(sortedTodosAsc[0].priority).toBe('critical');
    
    await wrapper.vm.toggleSortOrder();
    const sortedTodosDesc = wrapper.vm.sortedTodos;
    expect(sortedTodosDesc[0].priority).toBe('optional');
  });
});
