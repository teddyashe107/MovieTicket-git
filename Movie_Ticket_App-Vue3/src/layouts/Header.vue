<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="p-4 bg-gray-900 text-white" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="
              inline-flex
              items-center
              justify-center
              p-2
              rounded-md
              text-gray-400
              hover:text-white hover:bg-gray-700
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
            "
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div
          class="
            flex-1 flex
            items-center
            justify-center
            sm:items-stretch sm:justify-start
          "
        >
          <div class="flex-shrink-0 flex items-center">
            <h1
              class="
                tracking-tight
                bg-gradient-to-r
                from-purple-900
                to-pink-300
                bg-clip-text
                sm:text-3xl
                text-transparent text-xs
              "
            >
              Movie App
            </h1>
          </div>
          <HeaderSearch />
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
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
                        <h6>New Message</h6>
                        <p
                          :class="[active ? 'text-gray-300' : 'text-gray-500']"
                        >
                          How are you ?
                        </p>
                      </div>
                      <div>
                        <p
                          :class="[active ? 'text-gray-200' : 'text-gray-400']"
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
          <Menu as="div" class="ml-3 relative">
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
                  class="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
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

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
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
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
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
</style>