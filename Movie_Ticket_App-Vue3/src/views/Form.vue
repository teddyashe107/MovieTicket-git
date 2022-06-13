<script setup>
import {reactive} from 'vue'
import * as yup from 'yup'
import { Form, Field, ErrorMessage} from 'vee-validate'

const data = reactive({
    email: '',
    password: ''
})

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8)
})

function onSubmit(){
    console.log('on submit')
    
}
</script>

<template>
  <div>
    <Form @submit="onSubmit" :validation-schema="schema">
      <label for="email">Email</label>
      <Field type="text" name="email" v-model="data.email" />
      <ErrorMessage name="email" />
      <span class="text-white">{{ data.email }}</span>

      <label for="email">password</label>
      <Field type="password" name="password" v-model="data.password" />
      <ErrorMessage name="password" />
      <span class="text-white">{{ data.password }}</span>

      <button class="bg-green-700 text-white">Submit</button>
    </Form>
  </div>
</template>