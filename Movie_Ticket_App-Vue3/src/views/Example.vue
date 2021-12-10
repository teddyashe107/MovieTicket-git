<script setup>
import {computed, ref, watch} from'vue'
const data = ref(0)
function add() {
    data.value++
}

watch (data, (datadd, prevDatsa) => {
    console.log(datadd)
})

computed()


</script>


<template>
  <div class="container mx-auto flex flex-col items-center mt-32">
    <h1>{{ data }}</h1>

    <button @click="add" class="btn btn-info">count</button>
  </div>
</template>