import { shallowMount, mount } from '@vue/test-utils';
import Search from '~/components/Search';

describe('components/Search.vue', () => {
  let wrapper;

  beforeAll( () => console.log(Search.data.filters) )

  beforeEach( () => {
    wrapper = mount(Search);
  })

  test('선택 가능한 연도의 개수가 일치', () => {
    const year = wrapper.vm.filters.find( (filter) => {
      return filter.name === 'year';
    });
    const yearLength = new Date().getFullYear() - (new Date().getFullYear() - 50);
    expect(year.items.length).toBe(yearLength);
  })
})