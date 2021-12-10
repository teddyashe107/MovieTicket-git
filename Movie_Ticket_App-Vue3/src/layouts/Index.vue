<script setup>
//import { useStore } from 'vuex'
import Header from './Header.vue'
import Footer from './Footer.vue'
// let store = useStore();
</script>

<template>
  <div class="app-admin-wrap-layout-2">
    <Header />
  </div>
  <div class="">
    <main>
      <div class="flex flex-col">
        <div>
          <router-view />
        </div>
      </div>
    </main>
  </div>

  <Footer />
</template>


<style lang="scss" scoped>
.app-admin-wrap-layout-2 {
  // @media screen and (max-width: 991px) {
  width: 100%;
  margin-left: 0px;

  // }
}
</style>