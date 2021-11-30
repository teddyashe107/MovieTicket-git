<script setup>
import {useQuery, useResult, useApolloClient } from '@vue/apollo-composable'
import {gql} from 'graphql-tag'
/*
const {resolveClient} = useApolloClient()
const client = resolveClient('')
*/


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

/*
const {result} = useQuery(getScheduledMovie);
const scheduledMovies = useResult(result, null, (data) => data.schedule_movies)

const myMovies = () => {
  console.log(client)
}
*/
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
  <div class="text-xl font-semibold">Recommended Movies</div>
  <div>
    <!-- card example -->
    <div
      class="
        grid
        sm:grid-cols-2
        xs:grid-cols-1
        md:grid-cols-3
        xl:grid-cols-4
        gap-4
      "
    >
      <div class="container mx-auto" v-for="movie in movies" :key="movie.id">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full p-4">
            <a
              href=""
              class="
                c-card
                block
                bg-white
                shadow-lg
                hover:shadow-xl
                rounded-lg
                overflow-hidden
              "
            >
              <div class="relative pb-96 overflow-hidden">
                <img
                  class="absolute inset-0 h-full w-full object-cover"
                  src="/images/teda.jpg"
                  alt=""
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

              <div class="p-4 mt-0 flex items-center text-sm">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 fill-current text-yellow-500"
                >
                  <path
                    d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
                  ></path></svg
                ><svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 fill-current text-yellow-500"
                >
                  <path
                    d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
                  ></path></svg
                ><svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 fill-current text-yellow-500"
                >
                  <path
                    d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
                  ></path></svg
                ><svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 fill-current text-yellow-500"
                >
                  <path
                    d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
                  ></path></svg
                ><svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 fill-current text-gray-400"
                >
                  <path
                    d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"
                  ></path></svg
                ><span class="ml-2">Rate this movie</span>
              </div>
            </a>
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