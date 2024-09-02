import { shallowMount } from '@vue/test-utils';
import EditModal from '@/components/EditModal.vue';

describe('EditModal.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(EditModal, {
      propsData: {
        title: 'Edit To-Do Item',
        isVisible: true,
      },
    });
  });

  it('Show popup', () => {
    expect(wrapper.find('.modal-header h3').text()).toBe('Edit To-Do Item');
    expect(wrapper.find('.modal-overlay').exists()).toBe(true);
  });

  it('does not render modal when "isVisible" is false', async () => {
    await wrapper.setProps({ isVisible: false });
    expect(wrapper.find('.modal-overlay').exists()).toBe(false);
  });

  it('emits "close" event when close button is clicked', async () => {
    await wrapper.find('.close-btn').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('emits "save" event when save button is clicked', async () => {
    await wrapper.find('.btn-save').trigger('click');
    expect(wrapper.emitted().save).toBeTruthy();
  });
});
