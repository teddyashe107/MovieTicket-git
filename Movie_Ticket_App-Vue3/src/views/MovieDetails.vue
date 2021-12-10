<script setup>
import { reactive } from 'vue'

import { useAuth0, AuthState } from "../auth/index";
const { login, logout, initAuth, getToken, isAuthenticated, getUser} = useAuth0(AuthState);
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import {useRoute} from 'vue-router'
import { StarIcon } from '@heroicons/vue/solid'

const {mutate: addComment} = useMutation(gql`
  mutation insertComments($content: String!, $user_id: String!) {
  insert_comments_one(object: {content:$content, user_id:$user_id}) {
    id
  }
}

`)

const route = useRoute()
//const myId = getToken()
const cheakId = () => {
  console.log(myId)
} 

//console.log(isAuthenticated())
//console.log(window.localStorage.getItem('user'))

//const { result, loading, error } = useQuery(schedule_movies);

//const movies = useResult(result, null, (data) => data.schedule_movies);

initAuth();

const movie = reactive({
  name: route.query.name,
  rating:route.query.rating,
  description:route.query.description,
  thumbnail: route.query.thumbnail

})
</script>

<template>
  <div>
    <BaseCard class="container mx-auto mt-10">
      <div class="card-title mb-4 text-2xl font-bold">MovieDetails</div>

      <div class="flex flex-col items-center mb-4 md:flex-row">
        <img
          class="avatar-md mr-2 rounded w-40 h-60"
          :src="movie.thumbnail"
          alt=""
        />
        <div class="flex-grow text-center md:text-left ml-6">
          <h1 class="text-3xl">{{ movie.name }}</h1>
          <div class="flex items-center justify-center md:justify-start">
            <StarIcon
              v-for="rating in [0, 1, 2, 3, 4]"
              :key="rating"
              :class="[
                movie.rating > rating ? 'text-pink-700' : 'text-gray-200',
                'h-5 w-5 flex-shrink-0',
              ]"
              aria-hidden="true"
            />
            <a
              href="#"
              class="
                ml-3
                text-sm
                font-medium
                text-indigo-600
                hover:text-indigo-500
              "
              >117 reviews</a
            >
          </div>
          <h2>Movie length</h2>
          <p class="text-gray-900 text-lg mb-3 md:mb-0 mt-12">
            {{ movie.description }}
          </p>

          <Dialogue :thumbnail="movie.thumbnail" :name="movie.name">
            <BaseBtn
              xl
              class="
                border border-primary
                text-white
                bg-pink-600
                rounded-full
                hover:bg-gray-900 hover:text-white
              "
            >
              Book Ticket</BaseBtn
            >
          </Dialogue>
        </div>

        <h1 class="text-xl mr-2 font-bold">Add Rating</h1>

        <div v-if="!AuthState.loading">
          <div v-if="!AuthState.isAuthenticated">
            <BaseBtn
              xl
              class="
                border border-primary
                text-white
                bg-pink-600
                rounded-full
                hover:bg-gray-900 hover:text-white
              "
              @click="login()"
              >Rate Now</BaseBtn
            >
          </div>

          <Modal :modalActive="AuthState.isAuthenticated">
            <BaseCard noPadding class="bg-gray-300">
              <div class="grid grid-cols-12 text-left">
                <div class="col-span-12">
                  <div class="p-5">
                    <h1 class="mb-3 text-2xl text-pink-600 text-center">
                      Rate the movie
                    </h1>
                    <form @submit.prevent="logout()" class="text-left">
                      <div
                        class="mb-3 flex justify-center flex-col bg-gray-300"
                      >
                        <label for="points" class="text-pink-900 text-xl"
                          >Points min 0 max 100</label
                        >

                        <input
                          class="cursor-pointer shadow animate-pulse"
                          type="range"
                          id="points"
                          name="points"
                          min="0"
                          placeholder="0"
                          max="100"
                        />
                        <div
                          class="
                            flex
                            justify-between
                            mt-2
                            text-lg text-pink-600
                          "
                        >
                          <span class="w-8 text-left">0%</span>
                          <span class="w-8 text-center">25%</span>
                          <span class="w-8 text-center">50%</span>
                          <span class="w-8 text-center">75%</span>
                          <span class="w-8 text-right">100%</span>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="text-lg text-pink-600" for=""
                          >Add comments</label
                        >
                        <div>
                          <textarea
                            name="value"
                            cols="10"
                            rows="10"
                            v-model="comment"
                            class="
                              w-full
                              text-left
                              h-32
                              px-5
                              py-3
                              bg-gray-100
                              text-xl
                              focus:outline-none
                              border border-gray-300
                              rounded
                            "
                          >
                          </textarea>
                        </div>

                        <div class="flex items-center justify-center">
                          <button
                            type="submit"
                            class="rounded-full bg-pink-600 text-white p-3"
                          >
                            add comment
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </BaseCard>
          </Modal>
        </div>
      </div>
    </BaseCard>

    <BaseCard class="mt-6 container mx-auto">
      <h1 class="mt-8 text-xl font-bold">Top Reviews</h1>
      <div class="flex flex-col items-center mb-4 md:flex-row">
        <img
          class="avatar-md mr-2 rounded-full w-20 h-20"
          src="/images/teda.jpg"
          alt=""
        />
        <div class="flex-grow text-center md:text-left">
          <h6>
            created at <strong class="text-pink-600 text-lg">12-11-2021</strong>
          </h6>
          <p class="text-xs mb-3 md:mb-0">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
            laudantium adipisci, dignissimos similique voluptatem nobis nulla
            corporis officia quo natus ex commodi quasi mollitia molestiae ut
            dolor animi voluptate fugit?
          </p>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<style>
</style>