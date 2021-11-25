<script setup>
import {ref, reactive} from 'vue'
import { gql } from 'graphql-tag'
import {  useMutation } from '@vue/apollo-composable'

const name = ref()
//const image = ref('')
const state = reactive ({
  file_name : 'wooooow',
  base64str : ''
})


const getImage = (data) => {
    state.file_name = data.target.files[0].name
    const reader = new FileReader()
    if(data.target.files[0]){
      reader.readAsBinaryString(data.target.files[0])
      
    }
   
    reader.onload = () => {
      state.base64str = btoa(reader.result)

    
}}

const InsertMovie = gql`
mutation InsertMovie( $base64str: String!, $name : String!, $type : String!) {
  insertmovie(base64str: $base64str, name: $name, type: $type) {
    filePath
  }
}


`



const {mutate: insertMovie} = useMutation(InsertMovie)
  


</script>

<template>
  <div class="container mx-auto flex flex-col gap-32 text-white">
    <div class="px-32 py-32 relative">
      <div>
        <h1
          class="
            text-center
            bg-gradient-to-tr
            from-pink-800
            to-gray-200
            font-bold
            uppercase
            text-3xl
            bg-clip-text
            text-transparent
            mb-4
          "
        ></h1>
      </div>

      <BaseCard class="bg-gray-800">
        <div>
          <div class="text-3xl text-center">InsertMovie</div>
          <hr />
          <div>
            <form
              @submit.prevent="
                insertMovie({
                  base64str: state.base64str,
                  name: state.file_name,
                  type: 'wooow',
                })
              "
            >
              <div class="flex flex-col flex-1 items-center pt-3">
                <label for="name" class="text-xl">name</label>
                <input
                  type="text"
                  v-model="name"
                  placeholder="Enter name here..."
                  class="
                    rounded-full
                    p-3
                    m-4
                    text-xl
                    outline-none
                    text-gray-800
                  "
                />
              </div>
              <div class="flex flex-col flex-1 items-center pt-3">
                <label for="name" class="text-xl">image</label>
                <input type="file" @change="getImage" class="rounded-lg p-3" />
              </div>
              <div class="flex flex-col flex-1 items-center pt-3">
                <button
                  class="
                    bg-blue-800
                    p-3
                    px-12
                    rounded-lg
                    uppercase
                    hover:bg-blue-600
                  "
                >
                  upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </BaseCard>
    </div>
  </div>
</template>