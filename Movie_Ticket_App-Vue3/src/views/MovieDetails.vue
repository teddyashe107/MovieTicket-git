<script setup>
import { computed, onMounted, reactive, ref } from "vue";

import { useAuth0, AuthState } from "../auth/index";
const { login, logout, initAuth } = useAuth0(AuthState);
import { useQuery, useResult, useMutation } from "@vue/apollo-composable";
import { gql } from "graphql-tag";
import { useRoute, useRouter } from "vue-router";
import { StarIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/outline";
import { ClockIcon } from "@heroicons/vue/outline";
import { PlusIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";
import Swal from "sweetalert2";

import {
  Dialog,
  DialogOverlay,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

initAuth();
// get instance of store
//
// onMounted(() => {
//   const store = useStore();
//   const route = useRoute();
//   const id = route.params.id;
//   store.dispatch("home/getAllComments", id);
//   store.dispatch("home/getMovieDetail", id);
// });

const route = useRoute();
const router = useRouter();
// get and store scheduled movie id form home page
const movieInfo = route.params.id;

// get instance of store
const store = useStore();
// show detail of movie  // movie detail
const test2 = computed(() => store.state.home.viewMovie);

// get all comments from the store
const comments = computed(() => store.state.home.comments);

// this used to store scheduled date of the movie
const product = reactive({
  date_and_time: [],
});

// extract the movie schadule date_time in to js date and store it in product array

test2.value.schedule_dates.forEach((data) => {
  const days = ["Mon", "The", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthes = [
    "January",
    "February",
    "March",
    "April",
    "May",
    " June",
    "July",
    "August",
    "September",
    " October",
    "November",
    "December",
  ];
  const date = new Date(data.schedule_date);
  product.date_and_time.push({
    name:
      days[date.getDay()] +
      ", " +
      monthes[date.getMonth()] +
      "-" +
      date.getDate() +
      " " +
      date.getFullYear() +
      " at " +
      date.getHours() +
      ":" +
      date.getMinutes(),
    inStock: true,
  });
});

const date = reactive({
  date: test2.value.schedule_dates,
});

// fetch movies detail by movie id

const { result } = useQuery(
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
    id: movieInfo,
  }
);
// store fetch movies() response in reactive state
const movieDetail = useResult(result, null, (data) => data.schedule_movies);

// comment data to be inserted by the user
const commentData = reactive({
  schedule_id: movieInfo,
  content: "",
});

// send comment data to the server
function addComment() {
  store.commit("home/setCommentData", commentData);
  store.dispatch("home/addComment");
}

// thank you page for booking the ticket
const thankYouPage = () => {
  router.push({
    name: "ThankYou",
  });
};

// data from booking form
const Book = reactive({
  name: "",
  email: "",
  phone_number: "",
  number_of_ticket: 1,
  cinima_id: "google-oauth2|115138731985644817694",
  scheduled_movie_id: movieInfo,
  booking_date: "",
  payment_varified: false,
});

// set user selected scheduled date

function getScheduleDate(index) {
  Book.booking_date = test2.value.schedule_dates[index].schedule_date;
}

// cheak booking form data
const cheakBookingForm = () => {
  store.commit("home/setReservationData", Book);
  store.dispatch("home/addReservation");
  // console.log(store.state.home.reservationData)
};

const movie_price = reactive({
  price: test2.value.price,
  exact_price: computed(() => test2.value.price * Book.number_of_ticket),
});

function showStatus() {
  console.log(store.state.home.bookError);
  //        if(store.state.home.bookError.value !== null){
  //          Swal.fire({
  //                 icon: 'error',
  //                 title: 'Oops...',
  //                 text: 'Something went wrong!',
  //
  // })
}

//console.log(store.state.home.boo)
</script>

<template>
  <section class="bg-gradient-to-r from-black to-gray-700 p-10 pt-32">
    <div
      class="container px-4 sm:px-6 lg:px-8 mx-auto mt-8 text-white"
      v-for="(data, index) in movieDetail"
      :key="index"
    >
      <div class="grid grid-cols-12 gap-11">
        <div class="col-span-9 xl:col-span-3 lg:col-span-4 md:col-span-5">
          <img
            class="rounded-lg object-cover overflow-hidden bg-black"
            :src="data.movie.movie_thumbnail"
            alt=""
          />
        </div>
        <div
          class="
            col-span-9
            xl:col-span-9
            lg:col-span-8
            md:col-span-7
            sm:col-span-9
            xs:col-span-12
          "
        >
          <div class="flex flex-col">
            <h3 class="text-lg font-light">About Movie</h3>
            <p class="font-semibold text-3xl">{{ data.movie.movie_name }}</p>
            <div class="flex items-center">
              <StarIcon
                v-for="rating in [0, 1, 2, 3, 4]"
                :key="rating"
                :class="[
                  data.movie.rating > rating
                    ? 'text-pink-700'
                    : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0',
                ]"
                class="mt-3"
                aria-hidden="true"
              />
            </div>
            <BaseCard class="bg-gray-500 my-3 max-w-xl shadow-xl">
              <div
                class="flex items-center sm:font-extralight lg:justify-between"
              >
                <div class="ml-3">
                  <p class="text-2xl leading-5 font-serif">
                    Add your rating & Reviews
                  </p>
                  <p class="text-xl leading-5 font-serif text-gray-300">
                    your ratings matter
                  </p>
                </div>
                <div class="ml-3">
                  <RateDialogue
                    :thumbnail="data.movie.movie_thumbnail"
                    :name="data.movie.movie_name"
                  >
                    <template v-slot:DialogueButton>
                      <BaseBtn
                        v-if="!AuthState.isAuthenticated"
                        @click="login"
                        xl
                        class="
                          text-white
                          mt-2
                          bg-pink-700
                          hover:bg-pink-500 hover:text-white
                        "
                      >
                        Rate Now
                      </BaseBtn>
                      <BaseBtn
                        v-else
                        xl
                        class="
                          text-white
                          mt-2
                          bg-pink-700
                          hover:bg-pink-500 hover:text-white
                        "
                      >
                        Rate Now
                      </BaseBtn>
                    </template>

                    <template v-slot:Main>
                      <div class="mt-5 md:mt-0 md:col-span-3">
                        <form @submit.prevent="addComment()">
                          <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                              <div class="grid grid-cols-1">
                                <div class="sm:col-span-4">
                                  <label
                                    for="movie-description"
                                    class="
                                      block
                                      text-sm
                                      font-serif
                                      text-gray-700
                                    "
                                    >Type your comment</label
                                  >
                                  <textarea
                                    v-model="commentData.content"
                                    rows="7"
                                    class="
                                      shadow-sm
                                      focus:ring-indigo-500
                                      focus:border-indigo-500
                                      mt-1
                                      block
                                      w-full
                                      sm:text-sm
                                      border border-gray-300
                                      rounded-md
                                      placeholder-green-700
                                    "
                                    placeholder="add your comment here....."
                                  />
                                </div>

                                <div class="col-span-6"></div>
                              </div>
                            </div>

                            <div class="px-4 py-3 flex text-right sm:px-6">
                              <button
                                type="submit"
                                class="
                                  py-2
                                  px-4
                                  border border-transparent
                                  shadow-sm
                                  text-sm
                                  font-sans
                                  rounded-md
                                  text-white
                                  bg-pink-600
                                  hover:bg-pink-700
                                  focus:outline-none
                                  focus:ring-2
                                  focus:ring-offset-2
                                  focus:ring-indigo-500
                                "
                              >
                                Rate Now
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </template>
                  </RateDialogue>
                </div>
              </div>
            </BaseCard>
            <p>
              {{ data.movie.movie_description }}
            </p>
            <div class="self-start">
              <Dialogue
                :thumbnail="test2.movie.movie_thumbnail"
                :name="test2.movie.movie_name"
              >
                <template v-slot:DialogueButton>
                  <BaseBtn
                    xl
                    class="
                      border border-primary
                      text-white
                      mt-2
                      bg-purple-700
                      hover:bg-purple-500 hover:text-white
                    "
                  >
                    Book tickets
                  </BaseBtn>
                </template>
                <!-- book tickets form -->
                <template v-slot:Main>
                  <div class="mt-10 sm:mt-0">
                    <div class="md:grid md:grid-cols-1 md:gap-6">
                      <div class="mt-5 md:mt-0 md:col-span-2">
                        <form @submit.prevent="cheakBookingForm">
                          <div class="shadow overflow-hidden sm:rounded-md">
                            <div class="px-4 py-5 bg-white sm:p-6">
                              <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-12 sm:col-span-6">
                                  <label
                                    for="full-name"
                                    class="
                                      block
                                      text-sm
                                      font-serif
                                      text-gray-700
                                    "
                                    >Full name</label
                                  >
                                  <input
                                    type="text"
                                    v-model="Book.name"
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
                                    required
                                  />
                                </div>
                                <div class="col-span-6 sm:col-span-6">
                                  <label
                                    for="phone-number"
                                    class="
                                      block
                                      text-sm
                                      font-serif
                                      text-gray-700
                                    "
                                    >Phone number</label
                                  >
                                  <input
                                    type="tel"
                                    v-model="Book.phone_number"
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
                                    required
                                  />
                                </div>

                                <div class="col-span-6 sm:col-span-6">
                                  <label
                                    for="email-address"
                                    class="
                                      block
                                      text-sm
                                      font-serif
                                      text-gray-700
                                    "
                                    >Email address</label
                                  >
                                  <input
                                    type="text"
                                    v-model="Book.email"
                                    autocomplete="email"
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
                                    required
                                  />
                                </div>

                                <div class="col-span-6 sm:col-span-6">
                                  <label
                                    for="cinima-name"
                                    class="
                                      block
                                      text-sm
                                      font-serif
                                      text-gray-700
                                    "
                                    >Select Cinima</label
                                  >
                                  <select
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
                                    <option>
                                      {{ test2.cinima.cinima_name }}
                                    </option>
                                  </select>
                                </div>

                                <!-- no of tickets -->
                                <div class="col-span-12 sm:col-span-6">
                                  <label
                                    for="no-of-tickets"
                                    class="
                                      block
                                      text-sm
                                      font-serif
                                      text-gray-700
                                    "
                                    >No of tickets</label
                                  >
                                  <input
                                    type="number"
                                    v-model="Book.number_of_ticket"
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
                                    required
                                  />
                                </div>

                                <!-- show price -->
                                <div class="flex space-x-3 items-center">
                                  <h1 class="text-sm text-gray-900 font-serif">
                                    Price:
                                  </h1>
                                  <p
                                    class="
                                      bg-green-200
                                      text-gray-800
                                      p-1
                                      rounded-lg
                                    "
                                  >
                                    {{ movie_price.exact_price }}
                                  </p>
                                  <p class="font-serif">Birr</p>
                                </div>
                                <!-- Booking Date & time -->

                                <div class="col-span-6 sm:col-span-6">
                                  <h4
                                    class="
                                      text-sm
                                      aspect-w-2
                                      text-gray-900
                                      font-serif
                                    "
                                  >
                                    Select Booking Date & Time
                                  </h4>

                                  <RadioGroup
                                    v-model="Book.booking_date"
                                    class="mt-4"
                                  >
                                    <RadioGroupLabel class="sr-only">
                                      Select Booking Date & Time
                                    </RadioGroupLabel>
                                    <div class="grid grid-cols-2 gap-4">
                                      <RadioGroupOption
                                        as="template"
                                        v-for="index in product.date_and_time"
                                        :key="index"
                                        :value="index"
                                        @click="
                                          getScheduleDate(
                                            product.date_and_time.indexOf(index)
                                          )
                                        "
                                        :disabled="!index.inStock"
                                        v-slot="{ active, checked }"
                                      >
                                        <div
                                          :class="[
                                            index.inStock
                                              ? 'bg-white shadow-sm text-gray-900 text-center cursor-pointer'
                                              : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                            active
                                              ? 'ring-2 ring-indigo-500'
                                              : '',
                                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-semibold  hover:bg-gray-50 focus:outline-none sm:flex-1',
                                          ]"
                                        >
                                          <RadioGroupLabel as="p">
                                            {{ index.name }}
                                          </RadioGroupLabel>
                                          <div
                                            v-if="index.inStock"
                                            :class="[
                                              active ? 'border' : 'border-2',
                                              checked
                                                ? 'border-indigo-500  '
                                                : 'border-transparent',
                                              'absolute -inset-px rounded-md pointer-events-none',
                                            ]"
                                            aria-hidden="true"
                                          />
                                          <div
                                            v-else
                                            aria-hidden="true"
                                            class="
                                              absolute
                                              -inset-px
                                              rounded-md
                                              border-2 border-gray-200
                                              pointer-events-none
                                            "
                                          >
                                            <svg
                                              class="
                                                absolute
                                                inset-0
                                                w-full
                                                h-full
                                                text-gray-200
                                                stroke-2
                                              "
                                              viewBox="0 0 100 100"
                                              preserveAspectRatio="none"
                                              stroke="currentColor"
                                            >
                                              <line
                                                x1="0"
                                                y1="100"
                                                x2="100"
                                                y2="0"
                                                vector-effect="non-scaling-stroke"
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                      </RadioGroupOption>
                                    </div>
                                  </RadioGroup>
                                </div>
                              </div>
                            </div>
                            <div
                              class="px-4 py-3 bg-gray-50 text-right sm:px-6"
                            >
                              <button
                                type="submit"
                                @click="showStatus"
                                class="
                                  inline-flex
                                  flex-shrink-0
                                  justify-center
                                  py-3
                                  px-4
                                  border
                                  shadow-sm
                                  text-sm
                                  font-sans
                                  rounded-md
                                  bg-indigo-600
                                  hover:bg-indigo-700
                                  focus:outline
                                  focus:ring-2
                                  focus:ring-offset-2
                                  focus:ring-blue-500
                                "
                                :disabled="store.state.home.bookLoading"
                                :class="
                                  store.state.home.bookLoading
                                    ? 'text-transparent'
                                    : 'text-white'
                                "
                              >
                                <span
                                  v-if="store.state.home.bookLoading"
                                  class="loader bg-indingo-300"
                                ></span>
                                <span v-if="!store.state.home.bookLoading">
                                  Book Now</span
                                >
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </template>
              </Dialogue>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- movie overview -->
  <section class="border-b border-gray-100 shadow-lg bg-gray-900 text-white">
    <div class="container px-4 sm:px-6 lg:px-8 mx-auto md:ml-11 xl:mx-auto">
      <h1 class="text-3xl font-semibold pt-8">Top Reviews</h1>
    </div>

    <div
      class="container px-4 sm:px-6 lg:px-8 mx-auto md:ml-11 xl:mx-auto"
      v-for="(data, index) in comments"
      :key="index"
    >
      <div class="mt-10">
        <div class="flex items-center">
          <div class="h-16 w-16 flex flex-shrink-0">
            <img
              :src="data.user.picture"
              class="object-cover rounded-full"
              alt=""
            />
          </div>
          <div
            class="
              flex flex-col
              relative
              bg-gray-100
              max-w-3xl
              rounded-full
              sm:rounded-lg
              ml-2
              shadow-sm
              p-4
            "
          >
            <div class="flex">
              <div class="flex flex-col ml-3 -mt-2">
                <p class="font-semibold text-lg text-blue-500">
                  @{{ data.user.name }}
                  <span class="text-black">{{ data.content }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center ml-16">
          <div class="flex text-blue-800 font-semibold text-lg ml-11">
            <p>like</p>
            <p class="mx-2">dislike</p>
          </div>
          <ClockIcon class="h-4 w-4 text-blue-400" />

          <p class="ml-1 text-gray-100 font-serif">{{ data.created_at }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.loader {
  width: 48px;
  height: 48px;
  border: 3px dotted #fff;
  border-style: solid solid dotted dotted;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}
.loader::after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px dotted #ff3d00;
  border-style: solid solid dotted;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  animation: rotationBack 1s linear infinite;
  transform-origin: center center;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>