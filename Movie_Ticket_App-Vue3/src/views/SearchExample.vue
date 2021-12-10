<script setup>
  import {ref, reactive, computed} from 'vue'
  const search = ref('')
  const open = ref(false)
  import { StarIcon } from '@heroicons/vue/solid'

  const product = {
    rating: 2
  }

  const test = [0,1,2,3]
  console.log(product.rating > test)

  const list = ref([
     {
       id: 1,
       name: 'John Doe',
       age: 30,

     },
     {

        id: 2,
        name: 'Teddy Doe',
        age: 40,
      },
      {
        id: 3,
        name: 'Elias Doe',
        age: 50,
      },
     
  ])

// function onInputChange(e) {
//  return list.filter((item) =>{
//         
//           return  item 
//         }) 
// }



const serchedValue = computed(() => {
  return list.value.filter(data =>
  { return data.name.toLowerCase().includes(search.value.toLowerCase())})
})




// 
//  function filteredList() {
//         return list.filter((item) =>{
//         
//               return  item 
//         })
//     }


</script>
<template>
  <div class="container mx-auto flex justify-center items-center flex-col">
    <h1>Test Search</h1>
    <div
      class="
        mt-8
        container
        flex flex-col
        justify-center
        items-center
        bg-gray-900
      "
    >
      <label for="search">Search Items</label>
      <input
        type="text"
        class="
          rounded-full
          mb-3
          bg-gray-800
          outline-none
          text-white
          focus:shadow-none
        "
        placeholder="type here...."
        @change="onInputChange"
        v-model="search"
      />
    </div>

    <ul>
      <li v-for="item in serchedValue" :key="item">
        <h1>{{ item.name }}</h1>
        <p>{{ item.age }}</p>
      </li>
    </ul>

    <div class="flex items-center">
      <StarIcon
        v-for="rating in [0, 1, 2, 3, 4]"
        :key="rating"
        :class="[
          product.rating > rating ? 'text-pink-700' : 'text-gray-200',
          'h-5 w-5 flex-shrink-0',
        ]"
        aria-hidden="true"
      />
    </div>
  </div>
</template>