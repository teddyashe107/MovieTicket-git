<script setup>
import { ref, reactive } from 'vue';
import { gql } from 'graphql-tag';
//import {  useMutation } from '@vue/apollo-composable'
import {  useQuery, useResult, useMutation } from '@vue/apollo-composable'

import { useAuth0, AuthState } from "@/auth/index";
const { login, logout, initAuth, getToken, isAuthenticated, getUser} = useAuth0(AuthState);

import {XIcon} from '@heroicons/vue/outline'
import {PlusIcon} from '@heroicons/vue/outline'






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
   mutation scheduleMovie($cinima_id: String!, $movie_id:Int!, $price:float8, $schedule_dates: [schedule_date_insert_input!]!  ) {
  insert_schedule_movies(objects: {cinima_id:$cinima_id, movie_id: $movie_id, price: $price, 
    schedule_dates: {data: $schedule_dates}}) {
    affected_rows
  }
}
 `

  const {mutate: movieSchedule} = useMutation(scheduleMovie)


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
  <div class="hidden sm:block" aria-hidden="true">
    <div class="py-5">
      <div class="border-t border-gray-200" />
    </div>
  </div>

  <div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Create new movie as cinima
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores,
            consectetur!
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="uploadFile">
          <div class="shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 bg-white sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="actor-name"
                    class="block text-sm font-medium text-gray-700"
                    >Actor Name</label
                  >
                  <input
                    type="text"
                    v-model="datas.actor_name"
                    class="
                      mt-1
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="director-name"
                    class="block text-sm font-medium text-gray-700"
                    >Director Name</label
                  >
                  <input
                    type="text"
                    v-model="datas.director_name"
                    class="
                      mt-1
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="rating"
                    class="block text-sm font-medium text-gray-700"
                    >Rating</label
                  >
                  <input
                    type="number"
                    v-model="datas.rating"
                    class="
                      mt-1
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="movie-name"
                    class="block text-sm font-medium text-gray-700"
                    >Movie Name</label
                  >
                  <input
                    type="text"
                    v-model="datas.movie_name"
                    class="
                      mt-1
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="movie-type"
                    class="block text-sm font-medium text-gray-700"
                    >Movie type</label
                  >
                  <select
                    v-model="datas.movie_type"
                    class="
                      mt-1
                      block
                      w-full
                      py-2
                      px-3
                      border border-gray-300
                      bg-white
                      rounded-md
                      shadow-sm
                      focus:outline-none
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      sm:text-sm
                    "
                  >
                    <option>Action</option>
                    <option>Comedy</option>
                    <option>Drama</option>
                    <option>Fantasy</option>
                    <option>Horror</option>
                    <option>Mystery</option>
                    <option>Romance</option>
                    <option>Thriller</option>
                  </select>
                </div>

                <div class="col-span-6">
                  <label
                    for="published-year"
                    class="block text-sm font-medium text-gray-700"
                    >Published Year</label
                  >
                  <input
                    type="date"
                    v-model="datas.published_year"
                    class="
                      mt-1
                      focus:ring-indigo-500 focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <!-- thumbnail here-->
              </div>

              <div class="mt-6">
                <label class="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                <div
                  class="
                    mt-1
                    flex
                    justify-center
                    px-6
                    pt-5
                    pb-6
                    border-2 border-gray-300 border-dashed
                    rounded-md
                  "
                >
                  <div class="space-y-1 text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="file-upload"
                        class="
                          relative
                          cursor-pointer
                          bg-white
                          rounded-md
                          font-medium
                          text-indigo-600
                          hover:text-indigo-500
                          focus-within:outline-none
                          focus-within:ring-2
                          focus-within:ring-offset-2
                          focus-within:ring-indigo-500
                        "
                      >
                        <span>Upload Image</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          @change="onFileChange"
                          type="file"
                          class="sr-only"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>

                    <p class="text-xs text-gray-500">
                      {{ datas.image_name }}
                    </p>

                    <p class="text-xs text-gray-500"></p>
                  </div>
                </div>
              </div>
              <div class="mt-4">
                <label
                  for="movie-description"
                  class="block text-sm font-medium text-gray-700"
                >
                  Movie Description
                </label>
                <div class="mt-1">
                  <textarea
                    v-model="datas.movie_description"
                    rows="3"
                    class="
                      shadow-sm
                      focus:ring-indigo-500 focus:border-indigo-500
                      mt-1
                      block
                      w-full
                      sm:text-sm
                      border border-gray-300
                      rounded-md
                    "
                    placeholder="movie description here..."
                  />
                </div>
              </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
                Add Movie
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="col-span-12">
    <BaseCard>
      <template v-slot:cardHeader>
        <div class="card-header">
          <div class="card-title py-3 mx-4">All movies Added</div>
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
                    Movie Id
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
                    Published-year
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
                          v-if="!movie.is_published"
                        >
                          Schedule Now
                        </BaseBtn>
                      </template>

                      <template v-slot:Main>
                        <div class="mt-5 md:mt-0 md:col-span-2">
                          <form
                            @submit.prevent="
                              movieSchedule({
                                cinima_id: userInfo.sub,
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

                                    {{ setPrice }}
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
                                        type="date"
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

                    <BaseBtn
                      rounded
                      class="
                        border border-primary
                        text-white
                        bg-blue-900
                        hover:bg-primary hover:text-white
                      "
                    >
                      Update
                    </BaseBtn>

                    <BaseBtn
                      rounded
                      class="
                        border border-primary
                        text-white
                        bg-pink-700
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