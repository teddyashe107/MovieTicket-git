<script setup>
import { ref, reactive } from "vue"
import { useAuth0, AuthState } from "../auth/index";
const { login, logout, initAuth, getToken } = useAuth0(AuthState);
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import { gql } from "graphql-tag";

const {mutate: addComment} = useMutation(gql`
  mutation insertComments($content: String!, $user_id: String!) {
  insert_comments_one(object: {content:$content, user_id:$user_id}) {
    id
  }
}

`)


const myId = getToken()
const cheakId = () => {
  console.log(myId)
} 

//const { result, loading, error } = useQuery(schedule_movies);

//const movies = useResult(result, null, (data) => data.schedule_movies);

initAuth();





const modalActive = ref()
</script>

<template>
  <div>
    <BaseCard>
      <div class="card-title mb-4 text-2xl font-bold">MovieDetails</div>

      <div class="flex flex-col items-center mb-4 md:flex-row">
        <img
          class="avatar-md mr-2 rounded w-40 h-60"
          src="/images/teda.jpg"
          alt=""
        />
        <div class="flex-grow text-center md:text-left ml-6">
          <h1 class="text-3xl">Movie Name</h1>
          <h2 class="mt-4">Rating <strong class="text-pink-600">55</strong></h2>
          <h2>Movie length</h2>
          <p class="text-gray-900 text-lg mb-3 md:mb-0 mt-12">
            MovieDescription Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Saepe, voluptatem.
          </p>

          <BaseBtn
            xl
            class="
              border border-primary
              text-white
              mt-3
              bg-pink-600
              rounded-full
              hover:bg-gray-900 hover:text-white
            "
            >Book Tickets</BaseBtn
          >
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
                    <form @submit.prevent="addComment({content: comment, user_id: myId})" class="text-left">
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
    <h1 class="mt-8 text-xl font-bold">Top Reviews</h1>
    <BaseCard class="mt-6">
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