<script setup>
import { useAuth0, AuthState } from "../auth/index";
const { login, logout, initAuth } = useAuth0(AuthState);

initAuth();
</script>

<template>
  <div class="header-wrapper flex justify-between px-2">
    <div class="flex items-center">
      <BaseCard>
        <router-link to="/" class="text-center text-2xl">My Movie</router-link>
      </BaseCard>
    </div>

    <div class="flex items-center">
      <div v-if="!AuthState.loading">
        <div v-if="AuthState.isAuthenticated">
          <BaseBtn
            class="
              hidden
              mr-0
              hover:bg-gray-100
              sm:block
              rounded
              p-1
              md:mr-2
              text-2xl
              bg-red-500
              ml-4
            "
            @click="logout()"
          >
            Logout
          </BaseBtn>
        </div>
      </div>
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
