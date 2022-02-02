<script setup>
    import { computed, ref, reactive, onMounted } from 'vue'
    import {XIcon} from '@heroicons/vue/outline'
    import {useStore} from 'vuex'    
import { useRoute, useRouter } from 'vue-router'


      
      // dispath  action to get all movies
      onMounted(() => {
        store.dispatch('home/getAllMovies')
      })

    const store = useStore()
    let isSearchOpen = ref(false)
   

const allScheduledMovies = computed(() => store.state.home.movieDetails)


    const searchValue = reactive({
      data: '',
    })
// a computed function to get the search result
const searchResult = computed(() => {
    const search = searchValue.data
    if (search) {
        return allScheduledMovies.value.filter(movie => {
            return movie.movie.movie_name.toLowerCase().includes(search.toLowerCase())
        })
    }
    return allScheduledMovies.value
})

//  a function to show the details of the movie

const router = useRouter()
function showDetials(id) {
  store.dispatch('home/getAllComments', id)
 store.dispatch('home/getMovieDetail', id)
 router.push({
   name: 'ViewMovie',
    params: {
      id: id
    }  
  })

  isSearchOpen.value = false
}


function setSearchValue(){
    store.commit('home/setSearchValue')
}
    
</script>

<template>
  <div class="relative text-gray-600 search-bar mx-3 sm:flex hidden">
    <input
      @click="setSearchValue"
      class="
        bg-purple-50 bg-gray-100
        h-10
        px-5
        pr-10
        rounded-full
        text-sm
        focus:outline-none
      "
      type="search"
      name="search"
      placeholder="Search"
    />
    <button
      class="absolute right-0 top-0 mt-2 mr-4 focus:outline-none"
      type="submit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </div>
  <div class="search-ui" :class="{ open: store.state.home.isSearchOpen }">
    <div class="container mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div class="flex-shrink-0 flex items-center" @click="setSearchValue">
          <h1
            class="
              tracking-tight
              bg-gradient-to-r
              from-purple-900
              to-pink-300
              bg-clip-text
              text-3xl text-transparent
            "
          >
            Movie App
          </h1>
        </div>

        <button class="btn" @click="setSearchValue">
          <!-- x icon here -->
          <XIcon class="h-5 w-5 text-gray-700 ml-1" />
        </button>
      </div>
      <input
        class="focus:outline-none text-6xl mb-7 text-gray-400"
        type="text"
        v-model="searchValue.data"
        placeholder="Type Here"
      />

      <div>
        <p class="text-gray-500 mb-4">Search Result</p>

        <!-- search list  -->
        <div
          v-for="(item, index) in searchResult"
          :key="index"
          class="flex overflow-hidden flex-row pb-1 mb-6 shadow-md rounded-xl"
        >
          <div class="flex">
            <img
              class="w-24 object-cover"
              :src="item.movie.movie_thumbnail"
              alt=""
            />
          </div>
          <div class="flex pl-2 flex-1">
            <div class="flex flex-grow flex-col self-center justify-between">
              <a
                class="
                  text-lg
                  font-semibold
                  text-gray-700
                  hover:text-purple-500
                "
                href=""
              >
                {{ item.movie.movie_name }}</a
              >
              <p class="text-gray-500 text-sm">
                {{ item.movie.movie_description }}
                <button @click="showDetials(item.id)" class="inline-flex">
                  <span class="text-purple-500">Read More</span>
                </button>
              </p>
              <p class="mr-2 text-gray-600">Birr {{ item.price }}</p>
              <div>
                <button
                  @click="showDetials(item.id)"
                  class="
                    rounded
                    text-white
                    bg-purple-500
                    font-bold
                    text-xs
                    leading-4
                    py-1
                    px-2
                    mr-5
                  "
                >
                  Show Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-ui {
  position: fixed;
  top: -200%;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 0.75rem 1.5rem 1.5rem 4.5rem;
  z-index: 9999;
  background-color: #fff;
  max-width: 100%;
  height: 100vh;
  opacity: 0;
  transition: all 0.3s ease-in;
  visibility: hidden;
  overflow: auto;
  &.open {
    opacity: 1;
    visibility: visible;
    top: 0;
    transition: all 0.3s ease-in;
  }
}
</style>