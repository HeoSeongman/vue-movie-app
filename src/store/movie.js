import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';

const _defaultMessage = '검색하세요';

export default {
  // module
  namespaced: true,
  // data
  state: () => ({
    movies: [],
    loading: false,
    theMovie: {}
  }),
  // computed
  getters: {
    
  },
  // methods
  // 데이터 변경 가능(get, set)
  mutations: {
    resetMovies(state) {
      state.movies = [],
      state.loading = false
    },
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  // 데이터 변경 불가능(get) // 비동기
  actions: {
    async searchMovies(context, payload) {

      if (context.state.loading) {
        return;
      }

      context.commit('updateState', {
        loading: true
      })

      // const { title, type, number, year } = payload;
      // const OMDB_API_KEY = '7035c60c';
      // const result = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`);
      const result = await _fetchMovie( {...payload, page: 1 } );

      if (result.data.Response === 'False'){ 
        context.commit('updateState', {
          loading: false
        });
        return;
      }

      const { Search, totalResults } = result.data;
      context.commit('updateState', {
        movies: _uniqBy(Search, 'imdbID')
      })
      
      const total = parseInt(totalResults, 10);
      const pageLength = Math.ceil(total / 10);

      if(pageLength > 1){
        for(let i = 2; i <= pageLength; i++) {
          if(i > (payload.number / 10)) {
            break;
          }
          // const result = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${i}`);
          const result = await _fetchMovie( {...payload, page: i} )
          context.commit('updateState', {
            // 전개 연산자로 배열을 append 한다.
            movies: [...context.state.movies, ..._uniqBy(result.data.Search, 'imdbID')]
          })
        }
      }

      context.commit('updateState', {
        loading: false
      })
    },

    async searchMovieWithId(context, payload) {
      if(context.state.loading) return;
      context.commit('updateState', {
        loading: true,
        theMovie: {}
      })
      try {
        const res = await _fetchMovie(payload);
        // console.log(res, 'movie.searchMovieWithId')
        context.commit('updateState', {
          theMovie: res.data
        })
      } catch(error) {
        context.commit('updateState', {
          theMovie: {}
        })
      } finally {
        context.commit('updateState', {
          loading: false
        })
      }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload;
  const OMDB_API_KEY = '7035c60c';
  const url = id ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

  return new Promise( (resolve, reject) => {
    //axios.get(url).then( res => resolve(res))
    axios.get(url)
    .then( (res) => {
      // console.log(res)
      resolve(res);
    })
    .catch(error => {
      console.log('_fetchMovie Promise catch')
      reject(error.message);
    })
  })
}