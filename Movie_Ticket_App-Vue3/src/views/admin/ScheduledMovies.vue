<script setup>
import { reactive } from 'vue';
import {XIcon} from '@heroicons/vue/outline'
import {PlusIcon} from '@heroicons/vue/outline'
import { gql } from 'graphql-tag';
//import {  useMutation } from '@vue/apollo-composable'
import {  useQuery, useResult } from '@vue/apollo-composable'

const scheduleData = reactive ([
   {setPrice: ''},
   {scheduleDate: ''}
])

const scheduleNow = () => {

  console.log(scheduleData)
}
// handle add button 
const handleAdd = () => {
  scheduleData.push({scheduleDate: ''})
}
const handleRemove = () => {
  scheduleData.pop()
}
const getMovies = gql`
query getMovies {
  movies {
    id
    movie_name
    movie_type
    movie_thumbnail
    is_published
    published_year
  }
}

`
const {result, error} = useQuery(getMovies)
const movies = useResult(result, null, (data) => data.movies)

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

                  <td class="text-xs">{{ movie.movie_name }}</td>
                  <td class="py-5">
                    <div class="flex">
                      <img
                        class="w-9 h-9 rounded-full mr-2"
                        :src="movie.movie_thumbnail"
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
                  <td class="py-5">{{ 3.34 * index + 1 }}%</td>
                  <td class="py-5">12-02-20</td>
                  <td class="py-5">
                    <Dialogue
                      :thumbnail="movie.movie_thumbnail"
                      :name="movie.movie_name"
                    >
                      <template v-slot:DialogueButton>
                        <BaseBtn
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
                        <div class="mt-5 md:mt-0 md:col-span-2">
                          <form @submit.prevent="scheduleNow">
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
                                      >Set Price</label
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

                                    {{ scheduleData.setPrice }}
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
                                        type="date"
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
                                  Schedule Now
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </template>
                    </Dialogue>
                    <BaseBtn
                      rounded
                      class="
                        border border-primary
                        text-white
                        bg-pink-900
                        hover:bg-primary hover:text-white
                      "
                    >
                      Delete
                    </BaseBtn>
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