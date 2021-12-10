<script setup>
import {ref, reactive} from 'vue'
const state = reactive ({
  file_name : '',
  base64str : ''
})

const onFileChange = (data) => {
    state.file_name = data.target.files[0].name
    const reader = new FileReader()
    if(data.target.files[0]){
      reader.readAsBinaryString(data.target.files[0])
      
    }
   
    reader.onload = () => {
      state.base64str = btoa(reader.result)

    
}}

const uploadFile = async (req, res, next) => {
                console.log('Uploading file..........')
	try {
// execute the parent mutation in Hasura
		const fetchResponse = await fetch(
			'http://localhost:8000/api/upload',
			{
				method: 'POST',
		
				body: JSON.stringify({
					name: state.file_name,
                    base64str: state.base64str
				}),
			}
		);
		const { data, errors } = await fetchResponse.json();
		console.log(data);

	
	} catch (e) {
		next(e);
	}
};


</script>

<template>
  <div class="container mx-auto flex flex-col h-screen bg-blue-50">
    <label for="images">Upload image</label>
    <input type="file" @change="onFileChange" />
    <button type="submit" @click="uploadFile">upload</button>
  </div>
</template>