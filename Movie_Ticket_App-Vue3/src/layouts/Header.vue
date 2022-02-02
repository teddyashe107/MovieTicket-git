<script setup>
import {provide, ref} from 'vue'
import { useAuth0, AuthState } from "../auth/index";
const { login, logout, initAuth} = useAuth0(AuthState);
import { onMounted, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { useStore } from 'vuex'

initAuth()


let store = useStore()





 let sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen
const sideBarToggle = () => {
    let sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen

    if (sidenav == false) {
        store.commit('largeSidebar/toggleSidebarProperties')
    } else {
        store.commit('largeSidebar/toggleSidebarProperties')
    }
}

const router = useRouter()

const homePage = () => {
    router.push({
        name: 'Home'
    })
}

</script>
<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure
    as="nav"
    class="header-wrapper p-4 bg-gray-900 text-white"
    v-slot="{ open }"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="xl:hidden lg:hidden md:hidden sm:absolute sm:right-0">
          <!-- Mobile menu button-->
          <div class="-mr-2 flex md:hidden">
            <DisclosureButton
              class="
                bg-gray-800
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white hover:bg-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-offset-gray-800
                focus:ring-white
              "
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>

        <div class="mx-0 sm:mx-3" v-if="AuthState.isAuthenticated">
          <button
            @click="sideBarToggle"
            class="
              menu-toggle
              cursor-pointer
              text-gray-500
              align-middle
              focus:outline-none
            "
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <div class="flex-no-shrink flex items-center">
            <router-link
              to="/"
              class="
                tracking-tight
                bg-gradient-to-r
                from-purple-900
                to-pink-300
                bg-clip-text
                text-transparent text-3xl
                font-semibold
              "
            >
              Movie App
            </router-link>
          </div>
          <HeaderSearch />
          <div class="hidden md:block">
            <div class="flex space-x-4 ml-10 items-baseline">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.currentd
                    ? 'bg-purple-900 text-white'
                    : 'text-white hover:bg-purple-400 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
              <router-link
                to="/admin"
                v-if="AuthState.isAuthenticated"
                v-slot="{ isActive }"
                :class="[
                  isActive
                    ? 'bg-purple-900 text-white'
                    : 'text-white hover:bg-purple-400 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                >Cinima</router-link
              >
            </div>
          </div>
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              sm:static sm:inset-auto sm:ml-6 sm:pr-0
            "
          >
            <!-- notification-dropdown  -->
            <Menu as="div" class="relative inline-block text-left">
              <div>
                <MenuButton
                  class="
                    p-1
                    ml-3
                    relative
                    rounded-lg
                    hover:text-black hover:bg-gray-100
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-gray-800
                    focus:ring-white
                  "
                >
                  <span class="sr-only">View notifications</span>
                  <span
                    class="
                      h-5
                      w-5
                      absolute
                      text-sm
                      top-0
                      rounded-full
                      bg-purple-900
                      text-white
                    "
                    >3</span
                  >
                  <BellIcon class="h-6 w-6" aria-hidden="true" />
                </MenuButton>
              </div>

              <MenuItems
                id="menuItem"
                class="
                  absolute
                  right-0
                  w-44
                  mt-2
                  overflow-hidden
                  origin-top-right
                  bg-white
                  rounded-md
                  custom-box-shadow
                  focus:outline-none
                "
              >
                <div class="">
                  <MenuItem
                    v-for="(item, index) in 4"
                    :key="index"
                    v-slot="{ active }"
                  >
                    <button
                      :class="[
                        active ? 'bg-purple-500 text-white' : 'text-gray-900',
                        'group flex  items-center w-full px-4 py-2 text-sm',
                      ]"
                    >
                      <div class="flex flex-1 justify-between">
                        <div>
                          <h6>New Movie</h6>
                          <p
                            :class="[
                              active ? 'text-gray-300' : 'text-gray-500',
                            ]"
                          >
                            published
                          </p>
                        </div>
                        <div>
                          <p
                            :class="[
                              active ? 'text-gray-200' : 'text-gray-400',
                            ]"
                          >
                            10s
                          </p>
                        </div>
                      </div>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>

            <!-- Profile dropdown -->
            <Menu
              as="div"
              class="ml-3 relative"
              v-show="AuthState.isAuthenticated"
            >
              <div>
                <MenuButton
                  class="
                    bg-gray-800
                    relative
                    flex
                    text-sm
                    rounded-full
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-offset-gray-800
                    focus:ring-white
                  "
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    v-if="AuthState.user"
                    class="h-8 w-8 rounded-full"
                    :src="AuthState.user.picture"
                    alt=""
                  />
                  <img v-else class="h-8 w-8 rounded-full" src="" alt="" />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  id="menuItem"
                  class="
                    absolute
                    right-0
                    w-44
                    mt-2
                    overflow-hidden
                    origin-top-right
                    bg-white
                    rounded-md
                    custom-box-shadow
                    focus:outline-none
                  "
                >
                  <div class="">
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active ? 'bg-purple-500 text-white' : 'text-gray-900',
                          'group flex  items-center w-full px-4 py-2 text-sm',
                        ]"
                      >
                        Account Settings
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        :class="[
                          active ? 'bg-purple-500 text-white' : 'text-gray-900',
                          'group flex  items-center w-full px-4 py-2 text-sm',
                        ]"
                      >
                        Billing History
                      </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <button
                        @click="logout"
                        :class="[
                          active ? 'bg-purple-500 text-white' : 'text-gray-900',
                          'group flex  items-center w-full px-4 py-2 text-sm',
                        ]"
                      >
                        Sign Out
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel>
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="block"
          :class="[
            item.current
              ? 'bg-purple-900 text-white'
              : 'text-white hover:bg-purple-400 hover:text-white',
            'px-3 py-2 rounded-md text-sm font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</a
        >
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/vue/outline'

const navigation = [
  { name: 'Home', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  
]

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    return {
      navigation,
    }
  },
}
</script>

<style scoped>
#menuItem {
  z-index: 100;
}

Disclosure {
  z-index: 100;
}

.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 2;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
</style>