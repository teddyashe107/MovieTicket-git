<script setup>
import { ref, reactive } from 'vue';
import { gql } from 'graphql-tag';
//import {  useMutation } from '@vue/apollo-composable'
import {  useQuery, useResult, useMutation } from '@vue/apollo-composable'

import { useAuth0, AuthState } from "@/auth/index";
const { login, logout, initAuth, getToken, isAuthenticated, getUser} = useAuth0(AuthState);

import {XIcon} from '@heroicons/vue/outline'
import {PlusIcon} from '@heroicons/vue/outline'

// get all movies 
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

// all movies result
const {result, error} = useQuery(getMovies)
const movies = useResult(result, null, (data) => data.movies)
//console.log(movies)
const datas = reactive({
    actor_name: '',
    director_name: '',
    rating: '',
    movie_name: '',
    movie_type: '',
    published_year: '',
    image_name: '',
    base64str: '',
    movie_description: '',
})

const setPrice = ref()
const movieId = ref()

const getId = (id) => {
    movieId.value = id
}

const scheduleDataa = reactive([
    {
      schedule_date: '',
      }
])

// handle add button 
const handleAdd = () => {
  scheduleDataa.push({schedule_date: ''})
}
const handleRemove = () => {
  scheduleDataa.pop()
}

const scheduleMovie =gql`
   mutation scheduleMovie( $movie_id:Int!, $price:float8, $schedule_dates: [schedule_date_insert_input!]!  ) {
  insert_schedule_movies(objects: { movie_id: $movie_id, price: $price, 
    schedule_dates: {data: $schedule_dates}}) {
    affected_rows
  }
}
 `

  const {error: secheduleMovieError, loading, mutate: movieSchedule} = useMutation(scheduleMovie)


function onFileChange(e) {
   datas.image_name = e.target.files[0].name;
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsBinaryString(e.target.files[0])

      
    }
   
    reader.onload = () => {
      datas.base64str = btoa(reader.result)
    }
}

 
    //gql`
//    mutation scheduleMovie($cinima_id: String!, $movie_id:Int!, $price:float8, $schedule_dates: [schedule_date_insert_input!]!  ) {
//   insert_schedule_movies(objects: {cinima_id:$cinima_id, movie_id: $movie_id, price: $price, 
//     schedule_dates: {data: $schedule_dates}}) {
//     affected_rows
//   }
// }
//  `,{
//      variables: {
//        cinima_id: userInfo.sub,
//        movie_id: movieId.value,
//        price: setPrice.value,
//       schedule_dates: JSON.parse(JSON.stringify(scheduleDataa))
// 
//      },
//  }
//  )

 




const uploadFile = async (req, res, next) => {

	try {
// execute the parent mutation in Hasura
		const fetchResponse = await fetch(
   
			'http://localhost:8000/api/upload',
			{
        mode: 'cors',
				method: 'POST',
		     headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
			
          actor_name: datas.actor_name,
          director_name: datas.director_name,
          rating: datas.rating,
          movie_name: datas.movie_name,
          movie_type: datas.movie_type,
          published_year: datas.published_year,
          image_name: datas.image_name,
          base64str: datas.base64str,
          movie_description: datas.movie_description,

  
				}),
			}
		);
		// const { data, errors } = await fetchResponse.json();
		// console.log(data);

	
	} catch (e) {
		console.error(e);
	}
};
</script>

<template>
  <div class="col-span-12">
    <BaseCard class="bg-gray-900 text-white">
      <template v-slot:cardHeader>
        <div class="card-header">
          <div class="card-title text-3xl py-3 mx-4">All movies</div>
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
              <thead class="text-gray-200">
                <tr class="">
                  <th class="text-left border-b pb-3 mb-3">Movie Id</th>
                  <th class="text-left border-b pb-3 mb-3">Movie Name</th>
                  <th class="text-left border-b pb-3 mb-3">Thumbnail</th>
                  <th class="text-left border-b pb-3 mb-3">Status</th>
                  <th class="text-left border-b pb-3 mb-3">Published-year</th>
                  <th class="text-left border-b pb-3 mb-3">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="hover:bg-gray-800 cursor-pointer"
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
                        bg-yellow-700
                        text-white
                        border border-primary
                        mr-3
                        text-xs
                      "
                      v-if="movie.is_published"
                      >Scheduled</span
                    >
                    <span
                      class="
                        px-3
                        py-1
                        rounded-full
                        text-primary
                        bg-yellow-700
                        text-white
                        border border-primary
                        mr-3
                        text-xs
                      "
                      v-else
                      >Pending</span
                    >
                  </td>

                  <td class="py-5">{{ movie.published_year }}</td>
                  <td class="py-5">
                    <Dialogue
                      :thumbnail="movie.movie_thumbnail"
                      :name="movie.movie_name"
                    >
                      <template v-slot:DialogueButton>
                        <BaseBtn
                          rounded
                          @click="getId(movie.id)"
                          class="
                            border border-primary
                            text-white
                            bg-green-700
                            hover:bg-primary hover:text-white
                          "
                        >
                          <span v-if="!movie.is_published">Schedule Now</span>
                          <span v-else> Schedule Again</span>
                        </BaseBtn>
                      </template>

                      <template v-slot:Main>
                        {{ secheduleMovieError }}

                        <div class="mt-5 md:mt-0 md:col-span-2">
                          <form
                            @submit.prevent="
                              movieSchedule({
                                movie_id: movieId,
                                price: setPrice,
                                schedule_dates: scheduleDataa,
                              })
                            "
                          >
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
                                      v-model="setPrice"
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
                                      v-for="(item, index) in scheduleDataa"
                                      :key="index"
                                    >
                                      <input
                                        type="datetime-local"
                                        v-model="item.schedule_date"
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