import { shallowMount } from '@vue/test-utils';
import router from '~/routes/index.js';
import store from '~/store/index.js';
import loadImage from '~/plugins/loadimage.js';
import Movie from '~/routes/Movie.vue';

describe('routes/Movie.vue', () => {
  let wrapper;

  beforeEach( async () => {
    window.scrollTo = jest.fn();
    router.push('/movie/tt1234567');
    await router.isReady();
    wrapper = shallowMount(Movie, {
      global: {
        plugins: [
          store,
          router,
          loadImage
        ]
      }
    })
  })
  
  test('최초 접속한 URL의 파라미터를 확인', () => {
    expect(wrapper.vm.$route.params.id).toBe('tt1234567')
  })
  
})