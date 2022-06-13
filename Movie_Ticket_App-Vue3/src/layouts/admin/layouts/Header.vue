<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { Switch } from '@headlessui/vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuth0, AuthState } from "@/auth/index";
import { useStore } from 'vuex'
const { login, logout, initAuth} = useAuth0(AuthState);

// initialize store
let store = useStore()

//change sidebar toggle property
const sideBarToggle = () => {
    let sidenav = store.state.largeSidebar.sidebarToggleProperties.isSideNavOpen
    if (sidenav == false) {
        store.commit('largeSidebar/toggleSidebarProperties')
    } else {
        store.commit('largeSidebar/toggleSidebarProperties')
    }
}

initAuth()
</script>

<template>
  <div class="header-wrapper flex bg-gray-900 text-white justify-between px-4">
    <div class="flex items-center">
      <div class="logo flex justify-center">
        <div class="flex-no-shrink flex items-center">
          <router-link
            to="/"
            class="
              bg-gradient-to-r
              from-purple-900
              to-pink-300
              bg-clip-text
              text-transparent
              font-extrabold
            "
            ><h1 class="text-2xl">Movie App</h1>
          </router-link>
        </div>
      </div>
      <div class="mx-0 sm:mx-3">
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
    </div>
    <div class="flex items-center">
      <a
        class="hidden mr-0 btn btn-sm sm:block rounded p-1 md:mr-2"
        href="https://github.com/teddyashe107/MovieTicket-git"
        target="_blank"
      >
        <svg
          fill="currentColor"
          class="
            text-white
            w-8
            h-8
            hover:text-gray-100
            text-opacity-50
            transform
          "
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
          ></path>
        </svg>
      </a>

      <!-- profile menu-->
      <Menu as="div" class="ml-3 relative" v-show="AuthState.isAuthenticated">
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
</template>

<style lang="scss" scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  z-index: 100;
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
}
.mega-menu {
  width: 1200px;
}
ul.links {
  column-count: 2;
  li {
    margin-bottom: 8px;
  }
}
</style>
