<script setup>

import Header from '../admin/layouts/Header.vue'
import Sidebar from '../admin/layouts/Sidebar.vue'
import Footer from './layouts/Footer.vue'
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";



// get instance of store
const store = useStore();




</script>

<template>
  <div class="app-admin-wrap-layout-2">
    <Header />
    <Sidebar />
    <div :class="true ? '' : 'full'" class="main-content-wrap">
      <main>
        <div class="main-content-wrap flex flex-col flex-grow print-area pt-10">
          <div>
            <router-view />
          </div>

          <Footer />
        </div>
      </main>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.app-admin-wrap-layout-2 {
  width: 100%;
  height: 100%;
  .main-content-wrap {
    width: calc(100% - 120px);
    margin-left: 90px;
    // min-height: 100vh;
    margin-top: 80px;
    transition: all 0.24s ease-in-out;
    .main-content-body {
      min-height: calc(100vh - 80px);
    }
    &.full {
      width: 100%;
      margin-left: 0px;
      transition: all 0.24s ease-in-out;
    }
    @media screen and (max-width: 991px) {
      width: 100%;
      margin-left: 0px;
      padding-right: 16px;
      padding-left: 16px;
    }
  }
}
</style>


