import { shallowMount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';

describe('TodoItem.vue', () => {
  const todo = {
    text: 'Sample Todo',
    priority: 'critical',
    id: 1
  };

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(TodoItem, {
      propsData: { item: todo }
    });
  });

  it('Priority', () => {
    expect(wrapper.find('.todo-text').text()).toBe('Sample Todo');
    expect(wrapper.find('.todo-priority').text()).toBe('(critical)');
  });

  it('Edit', async () => {
    await wrapper.find('.btn-edit').trigger('click');
    expect(wrapper.emitted().edit).toBeTruthy();
    expect(wrapper.emitted().edit[0]).toEqual([todo]);
  });

  it('Remove', async () => {
    await wrapper.find('.btn-remove').trigger('click');
    expect(wrapper.emitted().remove).toBeTruthy();
    expect(wrapper.emitted().remove[0]).toEqual([todo]);
  });
});
