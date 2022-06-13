<script setup>
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import { computed, onMounted, reactive, ref, watchEffect } from "vue";




const { result, loading } = useQuery(
  gql`
    query moiveDetail($id: Int!) {
      schedule_movies(where: { id: { _eq: $id } }) {
        price
        cinima {
          cinima_name
        }
        schedule_dates {
          schedule_date
        }
        movie {
          id
          movie_name
          movie_thumbnail
          movie_type
          published_year
          rating
          movie_description
          director_name
          actor_name
        }
      }
    }
  `,
  {
    id: 172,
  }
);



const name = computed(() => {
  return result.value.schedule_movies[0].movie.movie_name + '' + result.value.schedule_movies[0].movie.movie_type + '' + result.value.schedule_movies[0].schedule_dates[0].schedule_date
})




</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <h1 class="text-white">Tewodros Ashenafi</h1>
  </div>
</template>


<style>
</style>