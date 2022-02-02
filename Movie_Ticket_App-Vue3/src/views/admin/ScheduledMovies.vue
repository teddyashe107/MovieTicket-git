<script setup>
import {ref, reactive, computed, onMounted } from 'vue';
import {XIcon} from '@heroicons/vue/outline'
import {PlusIcon} from '@heroicons/vue/outline'
import { gql } from 'graphql-tag';
//import {  useMutation } from '@vue/apollo-composable'
import {  useMutation, useQuery, useResult } from '@vue/apollo-composable'



const scheduleNow = () => {

  console.log(scheduleData)
}

const getMovies = gql`
query getScheduledMovies {
  schedule_movies {
    id
    price
    movie {
      movie_name
      movie_thumbnail
    }
    schedule_dates {
      schedule_date
    }
  }
}

`
const {result, error} = useQuery(getMovies)
const movies = useResult(result, null, (data) => data.schedule_movies)

const scheduleData = reactive ([
   {setPrice: ''},
 
])

// handle add button 
const handleAdd = () => {
  scheduleData.push({scheduleDate: ''})
}
const handleRemove = () => {
  scheduleData.pop()
}


// onMounted(() => {
//   scheduleData.setPrice = 100
// })




//const movieDetail = ref([])
const updateMovie = (id) => {
  // write a computed function to return movie by its id
  const data = computed(() => movies.value.filter(movie => movie.id == id))
  scheduleData.setPrice = data.value[0].price
 
}
// 
// const delete_scheduled_movie = gql`
// mutation delete_scheduled_movie($id: Int!) {
//   delete_schedule_movies_by_pk(id: $id) {
//     id
//   }
// }
// `
// const {mutate: deleteScheduledMovie} = useMutation(delete_scheduled_movie)
// 
// function delete_ScheduledMovie(id) {
//    deleteScheduledMovie({id: id}, {
//      update: (store, {}) => {
//        const data = store.readQuery({query: getMovies})
//        const updatedData = data.schedule_movies.filter(movie => movie.id !== id)
//        store.writeQuery({
//          query: getMovies,
//          data: {
//            movies: updatedData
//          }
//        })
// 
//        return updatedData
//      }
//     })
// }



</script>


<template>
  <div class="col-span-12">
    <BaseCard>
      <template v-slot:cardHeader>
        <div class="card-header">
          <div class="card-title py-3">Scheduled Movies</div>
        </div>
      </template>
      <div
        class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
      >
        <div
          class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
        >
          <div
            class="
              dataTable-container
              block
              w-full
              overflow-x-auto
              whitespace-nowrap
              borderless
              hover
            "
          >
            <table class="table-3 dataTable-table max-w-full w-full">
              <thead>
                <tr class="">
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Schedule Id
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Movie Name
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Thumbnail
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Status
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Price
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Date
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="hover:bg-gray-100 cursor-pointer"
                  v-for="movie in movies"
                  :key="movie.id"
                >
                  <td class="text-xs py-5 px-4">
                    {{ movie.id }}
                  </td>

                  <td class="text-xs">{{ movie.movie.movie_name }}</td>
                  <td class="py-5">
                    <div class="flex">
                      <img
                        class="w-9 h-9 rounded-full mr-2"
                        :src="movie.movie.movie_thumbnail"
                        alt=""
                      />
                    </div>
                  </td>
                  <td class="py-5">
                    <span
                      class="
                        px-3
                        py-1
                        rounded-full
                        text-primary
                        bg-green-700
                        text-white
                        border border-primary
                        mr-3
                        text-xs
                      "
                      >Scheduled</span
                    >
                  </td>
                  <td class="py-5">{{ movie.price }}</td>
                  <td class="py-5">
                    <ul>
                      <li
                        v-for="(item, index) in movie.schedule_dates"
                        :key="index"
                      >
                        {{ item.schedule_date }}
                      </li>
                    </ul>
                  </td>
                  <td class="py-5">
                    <Dialogue
                      :thumbnail="movie.movie.movie_thumbnail"
                      :name="movie.movie.movie_name"
                    >
                      <template v-slot:DialogueButton>
                        <BaseBtn
                          @click="updateMovie(movie.id)"
                          rounded
                          class="
                            border border-primary
                            text-white
                            bg-blue-700
                            hover:bg-primary hover:text-white
                          "
                        >
                          Update
                        </BaseBtn>
                      </template>

                      <template v-slot:Main>
                        {{ scheduleData.scheduleDate }}
                        <div class="mt-5 md:mt-0 md:col-span-2">
                          <form @submit.prevent="updateNow">
                            <div class="shadow overflow-hidden sm:rounded-md">
                              <div class="px-4 py-5 bg-white sm:p-6">
                                <div class="grid grid-cols-6 gap-6">
                                  <div class="col-span-6 sm:col-span-4">
                                    <label
                                      for="movie-name"
                                      class="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                      "
                                      >Update Price</label
                                    >
                                    <input
                                      type="number"
                                      v-model="scheduleData.setPrice"
                                      class="
                                        mt-1
                                        focus:ring-indigo-500
                                        focus:border-indigo-500
                                        block
                                        w-full
                                        shadow-sm
                                        sm:text-sm
                                        border-gray-300
                                        rounded-md
                                      "
                                    />
                                  </div>

                                  <div class="col-span-6">
                                    <div class="flex items-center">
                                      <label
                                        for="published-year"
                                        class="
                                          block
                                          text-sm
                                          font-medium
                                          text-gray-700
                                        "
                                        >Set Schedule Date</label
                                      >
                                      <BaseBtn @click="handleAdd">
                                        <span
                                          class="
                                            bg-gray-200
                                            shadow-sm
                                            p-1
                                            rounded-md
                                            inline-flex
                                            text-lg
                                            items-center
                                          "
                                        >
                                          <PlusIcon
                                            class="h-5 w-5 text-green-700 ml-1"
                                          />
                                        </span>
                                      </BaseBtn>
                                    </div>
                                    <div
                                      class="flex"
                                      v-for="(item, index) in scheduleData"
                                      :key="index"
                                    >
                                      <input
                                        type="datetime-local"
                                        v-model="item.scheduleData"
                                        class="
                                          mt-3
                                          focus:ring-indigo-500
                                          focus:border-indigo-500
                                          block
                                          w-full
                                          shadow-sm
                                          sm:text-sm
                                          border-gray-300
                                          rounded-md
                                        "
                                      />

                                      <button @click="handleRemove">
                                        <XIcon
                                          class="h-5 w-5 text-red-700 ml-1"
                                        />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                class="px-4 py-3 bg-gray-50 text-right sm:px-6"
                              >
                                <button
                                  type="submit"
                                  class="
                                    inline-flex
                                    justify-center
                                    py-2
                                    px-4
                                    border border-transparent
                                    shadow-sm
                                    text-sm
                                    font-medium
                                    rounded-md
                                    text-white
                                    bg-indigo-600
                                    hover:bg-indigo-700
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-offset-2
                                    focus:ring-indigo-500
                                  "
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </template>
                    </Dialogue>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="dataTable-bottom">
            <div class="dataTable-info">Showing 1 to 8 of 8 entries</div>
            <nav class="dataTable-pagination">
              <ul class="dataTable-pagination-list"></ul>
            </nav>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>