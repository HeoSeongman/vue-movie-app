<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div v-for="nav in navigations" :key="nav.name" class="nav-item">
        <RouterLink :to="nav.href" active-class="active" :class="{ active: isMatch(nav.path) }" class="nav-link" @click="selectedMovie">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div class="user" @click="toAbout">
      <img :src="image" :alt="name">
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo.vue';
import {mapState} from 'vuex';

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: `/movie/tt4520988`,
          path: /^\/movie/
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  methods: {
    isMatch(path) {
      // console.log(this.$route, 'isMatch(path)')
      if(!path) return false;
      return path.test(this.$route.fullPath)
    },
    selectedMovie() {
      console.log(this.$store.state.movie.movies)
      console.log(this.hasSelectedMovie);
    },
    toAbout() {
      this.$router.push('/about');
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ]),
    image() {
      return this.$store.state.about.image;
    },
    name() {
      return this.$store.state.about.name;
    },
    hasSelectedMovie() {
      // if (!this.$store.state.movie.theMovie) {
      //   console.log('nonSelcectedMovie');
      //   return `/`;
      // }
      // return `/movie/${this.$store.state.movie.theMovie.imdbID}`;
      // return `tt4520988`;
      return this.$store.state.movie.theMovie.imdbID;
    }
  }
}
</script>

<style scoped lang="scss">
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>