<script setup>
import {useQuery, useResult, useApolloClient } from '@vue/apollo-composable'
import {gql} from 'graphql-tag'

const {resolveClient} = useApolloClient()
const client = resolveClient('')



const getScheduledMovie = gql `
query getScheduledMovie {
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

const myMovies = () => {
  console.log(client)
}

const movies = [
  {
    id: 1,
    rating: 5,
    name: "Lost",
    type: "horror",
    image_path: "/images/teda.jpg",
  },
  {
    id: 2,
    rating: 4.5,
    name: "Prison Break",
    type: "action",
    image_path: "/images/teda.jpg",
  },
  {
    id: 3,
    rating: 4,
    name: "The Vampire",
    type: "horror",
    image_path: "/images/teda.jpg",
  },
  {
    id: 4,
    rating: 3,
    name: "Love",
    type: "romantic",
    image_path: "/images/teda.jpg",
  },
  {
    id: 5,
    rating: 2,
    name: "kid",
    type: "family",
    image_path: "/images/teda.jpg",
  },
  {
    id: 6,
    rating: 1,
    name: "noon",
    type: "horror",
    image_path: "/images/teda.jpg",
  },
];
const show = () => {
  console.table(movies);
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-3xl font-mono text-left">Recommended Movies</h1>
      <button @click="myMovies">my Movies</button>
      {{ scheduledMovies }}
    </div>

    <div
      class="
        grid
        xs:grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        gap-4
      "
    >
      <div v-for="movie in movies" :key="movie.id">
        <BaseCard class="text-center hover:bg-gray-100 hover:text-gray-900">
          <img
            class="w-70 h-60 m-auto shadow-sm avatar-md rounded"
            :src="movie.image_path"
          />
          <p class="text-base mt-4 text-left">
            rating
            <span class="font-bold text-red-700">{{ movie.rating }}</span>
          </p>
          <p class="text-left text-xl font-bold">{{ movie.name }}</p>
          <p class="my-2 text-lg text-gray-500 mb-3 text-left">
            {{ movie.type }}
          </p>

          <RouterLink
            block
            :to="{ name: 'MovieDetails', params: { id: movie.id } }"
            class="
              bg-pink-600
              hover:bg-gray-900 hover:text-white
              text-white
              mb-2
              rounded-full
            "
          >
            show details
          </RouterLink>
        </BaseCard>
      </div>
    </div>
  </div>
</template>


<style>
</style>