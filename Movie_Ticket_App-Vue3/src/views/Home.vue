<script setup>

import {gql} from 'graphql-tag'
import {useRouter} from 'vue-router';
import{computed, onMounted} from'vue'
import { sendNotification} from '../firebase/config'
import {useSubscription, useResult} from '@vue/apollo-composable'

import {  useStore } from 'vuex'

// get instance of router
const router = useRouter()

// send fcm user token to the server
 sendNotification()



// initialise the store
const store = useStore()

// dispath  action to get all movies
store.dispatch('home/getAllMovies')


// get all movies from the store
const movieData = computed(() => store.state.home.movieDetails)

// show the details of the movie
function movieDetailPage (id) {
store.dispatch('home/getAllComments', id)
 store.dispatch('home/getMovieDetail', id)

  router.push({
   name: 'ViewMovie',
    params: {
      id: id
    }  
  })

}
// 
// const { result, error } = useSubscription(
// 							gql`
// 					subscription getReservation {
// 						ticket_reservation {
// 							id
// 							name
// 							email
// 							number_of_ticket
// 							payment_varified
// 							phone_number
// 							booking_date
// 							scheduled_movie_id
// 						}
// 					}
// 				`
// 			);
// 		
// 
// console.error(result)
// console.log(error)
// 
// 

// // get new movies added by using subscription
// 
// const {result: newMovies} = useSubscription(gql `
// subscription onNewMovieAdded {
//   schedule_movies(offset: 2) {
//     id
//     price
//     cinima {
//       cinima_name
//     }
//     schedule_dates {
//       schedule_date
//     }
//     movie {
//       movie_name
//       movie_thumbnail
//       movie_type
//       published_year
//       rating
//       movie_description
//       director_name
//       actor_name
//     }
//   }
// }
// 
// `)
// 
// const newMoviesAdded = useResult(newMovies, null, (data) => data.schedule_movies)
// console.log(newMovies.value)


// end of all comments

</script>

<template>
  <Hero />
  <div class="bg-gray-900">
    <div class="sm:justify-center container mx-auto">
      <h1
        class="
          text-4xl
          font font-extrabold
          tracking-tight
          bg-gradient-to-r
          from-gray-100
          to-white
          bg-clip-text
          text-transparent text-left
          leading-10
          pt-8
        "
      >
        Recommended Movies
      </h1>
    </div>
  </div>

  <div v-if="store.state.home.loading">
    <div class="flex justify-center text-6xl bg-gray-900 p-10 items-center">
      <div class="loader"></div>
    </div>
  </div>
  <div v-else-if="store.state.home.error">
    <div class="flex justify-center text-white bg-red-600 text-3xl">
      <p>Something went wrong</p>
    </div>
  </div>

  <div class="pt-11 bg-gray-900 text-white" v-else>
    <!-- card example -->
    <div
      class="
        grid
        sm:grid-cols-1 sm:container sm:mx-auto
        xs:grid-cols-1 xs:container xs:mx-auto
        md:grid-cols-2 md:container md:mx-auto
        xl:grid-cols-4
        gap-4
      "
    >
      <div class="container mx-auto" v-for="movie in movieData" :key="movie.id">
        <div @click="movieDetailPage(movie.id)" class="flex flex-wrap -mx-4">
          <div
            class="
              w-full
              p-4
              c-card
              block
              shadow-lg
              hover:shadow-2xl
              rounded-lg
              overflow-hidden
            "
          >
            <div class="relative pb-96 overflow-hidden">
              <img
                class="absolute inset-0 rounded-lg h-full w-full object-cover"
                :src="movie.movie.movie_thumbnail"
                alt=""
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <span
                class="
                  px-2
                  py-1
                  leading-none
                  bg-pink-200
                  text-pink-800
                  rounded-full
                  font-semibold
                  uppercase
                  tracking-wide
                  text-xs
                  inline-flex
                  space-x-2
                "
                >{{ movie.movie.movie_type }}</span
              >

              <h2 class="mt-2 mb-2 font-bold">
                {{ movie.movie.movie_name }}
              </h2>

              <div class="mt-3 flex items-baseline">
                <span class="font-bold text-xl mr-1">{{ movie.price }}</span>
                <span class="text-sm font-semibold">Birr</span>
              </div>
            </div>

            <div class="flex items-center ml-3">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[
                  movie.movie.rating > rating
                    ? 'text-pink-700'
                    : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0',
                ]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.loader {
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: #fff;
}
.loader:before,
.loader:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: inherit;
  height: inherit;
  border-radius: 50%;
  transform: rotateX(70deg);
  animation: 1s spin linear infinite;
}
.loader:after {
  color: #ff3d00;
  transform: rotateY(70deg);
  animation-delay: 0.4s;
}

@keyframes rotate {
  0% {
    transform: translate(-50%, -50%) rotateZ(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateZ(360deg);
  }
}

@keyframes rotateccw {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes spin {
  0%,
  100% {
    box-shadow: 0.2em 0px 0 0px currentcolor;
  }
  12% {
    box-shadow: 0.2em 0.2em 0 0 currentcolor;
  }
  25% {
    box-shadow: 0 0.2em 0 0px currentcolor;
  }
  37% {
    box-shadow: -0.2em 0.2em 0 0 currentcolor;
  }
  50% {
    box-shadow: -0.2em 0 0 0 currentcolor;
  }
  62% {
    box-shadow: -0.2em -0.2em 0 0 currentcolor;
  }
  75% {
    box-shadow: 0px -0.2em 0 0 currentcolor;
  }
  87% {
    box-shadow: 0.2em -0.2em 0 0 currentcolor;
  }
}

/*
        .c-card
img
  transition: transform .3s ease-in-out

  */
</style>