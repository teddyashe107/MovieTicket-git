<script setup>
import {useStore} from 'vuex'
const store = useStore()


function setSearchValue(){
    store.commit('home/setSearchValue')
}
</script>

<template>
  <div class="relative bg-gray-900 overflow-hidden pt-32">
    <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
      <div
        class="
          relative
          container
          mx-auto
          px-4
          sm:flex sm:flex-col
          lg:px-8
          sm:static
        "
      >
        <div class="sm:max-w-lg sm:flex sm:flex-col">
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
              sm:text-6xl
            "
          >
            Hollywoods top 20s are availiable now
          </h1>
          <p class="mt-4 text-xl text-gray-500">
            This year, our new summer collection will shelter you from the harsh
            elements of a world that doesn't care if you live or die.
          </p>
        </div>
        <div>
          <div class="mt-10">
            <!-- Decorative image grid -->
            <div
              aria-hidden="true"
              class="
                pointer-events-none
                lg:absolute lg:max-w-7xl lg:mx-auto lg:w-full
              "
            >
              <div
                class="
                  absolute
                  transform
                  sm:left-1/2 sm:top-0 sm:translate-x-8
                  lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8
                "
              >
                <div class="flex items-center space-x-6 lg:space-x-8">
                  <div
                    class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div
                      class="
                        w-44
                        h-64
                        rounded-lg
                        overflow-hidden
                        sm:opacity-0
                        lg:opacity-100
                      "
                    >
                      <img
                        src="/images/The-Avengers-Poster-013.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div
                      class="
                        w-44
                        h-64
                        rounded-lg
                        overflow-hidden
                        sm:opacity-0
                        lg:opacity-100
                      "
                    >
                      <img
                        src="/images/321257,xcitefun-hummingbird-movie-poster-3.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                  <div
                    class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div
                      class="
                        w-44
                        h-64
                        rounded-lg
                        overflow-hidden
                        sm:opacity-0
                        lg:opacity-100
                      "
                    >
                      <img
                        src="/images/VFW.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div
                      class="
                        w-44
                        h-64
                        rounded-lg
                        overflow-hidden
                        sm:opacity-0
                        lg:opacity-100
                      "
                    >
                      <img
                        src="/images/Poster-tangled-4.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div
                      class="
                        w-44
                        h-64
                        rounded-lg
                        overflow-hidden
                        sm:opacity-0
                        lg:opacity-100
                      "
                    >
                      <img
                        src="/images/Avatar.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                  <div
                    class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div class="w-44 h-64 rounded-lg overflow-hidden">
                      <img
                        src="images/Avatar.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="w-44 h-64 rounded-lg overflow-hidden">
                      <img
                        src="/images/james-bond-no-time-to-die-i86328.jpg"
                        alt=""
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              @click="setSearchValue"
              class="
                inline-block
                text-center
                bg-purple-600
                border border-transparent
                rounded-md
                py-3
                px-8
                font-medium
                text-white
                hover:bg-indigo-700
              "
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>