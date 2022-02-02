<script setup>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useStore } from "vuex";
const store = useStore();

function setSearchValue() {
  store.commit("home/setSearchValue");
}

// Import Swiper styles

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay];

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];
</script>
<template>
  <swiper
    class="w-full h-96 mt-32"
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    :autoplay="{ delay: 1500 }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    loop
  >
    <swiper-slide v-for="(item, index) in images" :key="index">
      <div class="relative">
        <img
          class="h-full w-full object-cover content-center"
          :src="item.src"
          alt=""
        />
      </div>
      <div class="absolute inset-0 flex bg-black bg-opacity-75">
        <div class="sm:max-w-xl sm:flex sm:flex-col px-10 m-10 sm:m-4 sm:ml-44">
          <h1
            class="
              text-4xl
              font font-extrabold
              tracking-tight
              bg-gradient-to-r
              from-purple-900
              to-pink-300
              bg-clip-text
              text-transparent
              sm:text-5xl
            "
          >
            Top 20 Hollywood Movies are availiable
          </h1>
          <p class="mt-4 text-xl text-gray-500">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn't care if you live or die.
          </p>
          <div class="self-justify-center self-items-center">
            <button
              @click="setSearchValue"
              class="
                border-2 border-purple-700
                hover:bg-purple-600
                text-white
                p-4
                rounded-lg
              "
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </swiper-slide>

    ...
  </swiper>
</template>