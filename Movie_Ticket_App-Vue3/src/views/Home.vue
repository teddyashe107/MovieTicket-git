<script setup>
import {useQuery, useResult, useApolloClient, useSubscription } from '@vue/apollo-composable'
import {gql} from 'graphql-tag'
import {useRoute,useRouter} from 'vue-router';
import{computed, reactive, ref} from'vue'
import { StarIcon } from '@heroicons/vue/solid'

  const product = {
    rating: 3.9
  }
/*
const {resolveClient} = useApolloClient()
const client = resolveClient('')
*/
const router = useRouter()
const route = useRoute()



const getScheduledMovie = gql `
query getMovies {
  schedule_movies {
    id
    movie {
      name
      movie_type
      price
      published_year
    }
  }
}


`


const {result} = useQuery(getScheduledMovie);
const scheduledMovies = useResult(result, null, (data) => data.schedule_movies)

//console.log(scheduledMovies)
/*
const myMovies = () => {
  console.log(client)
}
*/
const movies = ref([
  {
    id: 1,
    rating: 5,
    name: "Lost",
    description: 'ServicesBrandingDesignMarketingAdvertisementCompanyAbout usContactJobsPress kitLegalTerms of usePrivacy policyCookie policy',
    type: "horror",
    image_path: "/images/teda.jpg",
  },
  {
    id: 2,
    rating: 4.5,
    name: "Prison Break",
     description: 'ServicesBrandingDesignMarketingAdvertisementCompanyAbout usContactJobsPress kitLegalTerms of usePrivacy policyCookie policy',
    type: "action",
    image_path: "/images/teda.jpg",
  },
  {
    id: 3,
    rating: 4,
    name: "The Vampire",
     description: 'ServicesBrandingDesignMarketingAdvertisementCompanyAbout usContactJobsPress kitLegalTerms of usePrivacy policyCookie policy',
    type: "horror",
    image_path: "/images/teda.jpg",
  },
  {
    id: 4,
    rating: 3,
    name: "Love",
     description: 'ServicesBrandingDesignMarketingAdvertisementCompanyAbout usContactJobsPress kitLegalTerms of usePrivacy policyCookie policy',
    type: "romantic",
    image_path: "/images/teda.jpg",
  },
  {
    id: 5,
    rating: 2,
    name: "kid",
     description: 'ServicesBrandingDesignMarketingAdvertisementCompanyAbout usContactJobsPress kitLegalTerms of usePrivacy policyCookie policy',
    type: "family",
    image_path: "/images/teda.jpg",
  },
  {
    id: 6,
    rating: 1,
    name: "noon",
     description: 'ServicesBrandingDesignMarketingAdvertisementCompanyAbout usContactJobsPress kitLegalTerms of usePrivacy policyCookie policy',
    type: "horror",
    image_path: "/images/teda.jpg",
  },
])


function newPage (name) {
 const movieDetail = computed(() => {
  return movies.value.filter(data => data.name.includes(name))

})
 const dataP = JSON.parse(JSON.stringify(movieDetail.value))
 // console.log(dataP[0].name)
   router.push({
     name: 'MovieDetails', 
     params : { name: name},
     query: {
       name: dataP[0].name,
       rating: dataP[0].rating,
       description: dataP[0].description,
       thumbnail: dataP[0].image_path
     
     }})
}



const show = () => {
  console.table(movies);
};
</script>

<template>
  <ul>
    <li v-for="movie in scheduledMovies" :key="movie.id">
      <div class="flex flex-col">
        <div class="flex-1">
          <div class="text-xl font-semibold">{{ movie.movie.name }}</div>
          <div class="text-sm font-semibold">{{ movie.movie.movie_type }}</div>
        </div>
        <div class="flex-1">
          <div class="text-xl font-semibold">{{ movie.movie.price }}</div>
          <div class="text-sm font-semibold">
            {{ movie.movie.published_year }}
          </div>
        </div>
      </div>
    </li>
  </ul>

  <Hero />
  <div
    class="
      flex flex-col
      ml-auto
      justify-center
      max-w-full
      bg-gray-900
      h-20
      tracking-tight
      border-b
      shadow-lg
    "
  >
    <h1
      class="
        mx-auto
        bg-gradient-to-r
        from-purple-900
        to-pink-300
        bg-clip-text
        text-transparent text-xs
        font font-bold
        sm:text-3xl
      "
    >
      Recommended Movies
    </h1>
  </div>

  <div class="pt-11">
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
      <div
        class="container mx-auto"
        v-for="movie in movies"
        :key="movie.id"
        @click="newPage(movie.name)"
      >
        <div class="flex flex-wrap -mx-4">
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
                src="/images/The-Avengers-Poster-013.jpg"
                alt=""
                loading="lazy"
              />
            </div>
            <div class="p-4">
              <span
                class="
                  inline-block
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
                "
                >November 11/30/21</span
              >

              <h2 class="mt-2 mb-2 font-bold">
                Purus Ullamcorper Inceptos Nibh
              </h2>

              <div class="mt-3 flex items-center">
                <span class="text-sm font-semibold">ab</span>&nbsp;<span
                  class="font-bold text-xl"
                  >45,00</span
                >&nbsp;<span class="text-sm font-semibold">€</span>
              </div>
            </div>

            <div class="flex items-center">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[
                  movie.rating > rating ? 'text-pink-700' : 'text-gray-200',
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
<style lang="sass">
.c-card
img
  transition: transform .3s ease-in-out

:hover
  img
    transform: scale(1.05)
</style>