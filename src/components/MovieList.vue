<template>
  <div class="container">
    <div :class="{ 'no-result': !movies.length }" class="inner">
      <Loader v-if="loading" />
      <div v-else-if="!movies.length" class="message">
        검색하세요.
      </div>
      <div v-else="!loading" class="movies">
        <MovieItem v-for="tv in movies" :key="tv.imdbID" :movie="tv" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem';
import Loader from '~/components/Loader.vue';

export default {
  components: {
    MovieItem,
    Loader
  },
  computed: {
    movies() {
      // 위 MovieItem v-for에 movies 에서 사용함
      return this.$store.state.movie.movies;
    },
    loading() {
      return this.$store.state.movie.loading;
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
    .message {
      font-size: 20px;
      color: $gray-400;
    }
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    
  }
}
</style>