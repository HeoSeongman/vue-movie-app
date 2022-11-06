<template>
  <div class="container">
    <input v-model="title" placeholder="Search For Movies, Series & more" @keyup.enter="apply" class="form-control" type="text">
    <div class="selects">
      <select v-for="filter in filters" v-model="$data[filter.name]" :key="filter.name" class="form-select">
        <option v-if="filter.name === 'year'" value="">All Years</option>
        <option v-for="item in filter.items" :key="item">{{item}}</option>
      </select>
    </div>
    <button class="btn btn-primary" @click="apply">Apply</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = [];
            const thisYear = new Date().getFullYear();
            for(let i = 0; i < 50; i++) {
              years.push(thisYear - i);
            }
            return years;
          })()
          // items: () => {
          //   const years = [];
          //   const thisYear = new Date().getFullYear(); 
          //   for(let i = thisYear; i >= 1985; i--) {
          //     years.push(i);
          //   }
          //   return years;
          // }
        }
      ]
    }
  },
  methods: {
    apply() {
      // Store 의 mutations 로 전송할 때는 commit(전송 받을 모듈의 함수, 전송할 데이터)
      //          actions 로 전송할 때는 dispatch(전송 받을 모듈의 함수, 전송할 데이터)
      this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }

  @include media-breakpoint-down(lg) {
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>