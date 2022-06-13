<script setup>
import {ref, reactive, computed, onMounted } from 'vue';
import {XIcon} from '@heroicons/vue/outline'
import {PlusIcon} from '@heroicons/vue/outline'
import { gql } from 'graphql-tag';
//import {  useMutation } from '@vue/apollo-composable'
import {  useQuery, useResult, useSubscription } from '@vue/apollo-composable'




const getReservation = gql`
query getReservation {
  ticket_reservation {
    id
    name
    email
    number_of_ticket
    payment_varified
    phone_number
    booking_date
    scheduled_movie_id
  
    schedule_movie {
      movie {
        movie_name
        movie_thumbnail
      }
    }
  }
}

`
const {result, error} = useQuery(getReservation)
const coustomers = useResult(result, null, (data) => data.ticket_reservation)



</script>



<template>
  <div class="col-span-12">
    <BaseCard class="bg-gray-800 text-white">
      <template v-slot:cardHeader>
        <div class="card-header">
          <div class="card-title py-3">Recent Reservations</div>
        </div>
      </template>
      <div
        class="block w-full overflow-x-auto whitespace-nowrap borderless hover"
      >
        <div
          class="dataTable-wrapper dataTable-loading no-footer fixed-columns"
        >
          <div
            class="
              dataTable-container
              block
              w-full
              overflow-x-auto
              whitespace-nowrap
              borderless
              hover
            "
          >
            <table class="table-3 dataTable-table max-w-full w-full">
              <thead>
                <tr class="">
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Reservation Id
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Coustmer Name
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Movie
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Status
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Paid
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Date
                  </th>
                  <th
                    class="
                      text-left
                      border-b
                      pb-3
                      mb-3
                      text-gray-500
                      font-semibold
                    "
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="hover:bg-gray-700 cursor-pointer"
                  v-for="(item, index) in coustomers"
                  :key="index"
                >
                  <td class="text-xs py-5 px-4">
                    {{ item.id }}
                  </td>

                  <td class="text-xs">{{ item.name }}</td>
                  <td class="py-5">
                    <div class="flex">
                      <img
                        class="w-9 h-9 rounded-full mr-2"
                        :src="item.schedule_movie.movie.movie_thumbnail"
                        alt=""
                      />
                    </div>
                  </td>
                  <td class="py-5">
                    <span
                      class="
                        px-3
                        py-1
                        rounded-full
                        text-primary text-white
                        border border-primary
                        mr-3
                        text-xs
                      "
                      :class="
                        item.payment_varified ? 'bg-green-700' : 'bg-red-700'
                      "
                      v-if="item.payment_varified"
                      >Paid</span
                    >
                    <span
                      class="
                        px-3
                        py-1
                        rounded-full
                        text-primary text-white
                        border border-primary
                        mr-3
                        text-xs
                      "
                      :class="
                        item.payment_varified ? 'bg-green-700' : 'bg-red-700'
                      "
                      v-else
                      >not paid</span
                    >
                  </td>
                  <td class="py-5">0 Birr</td>
                  <td class="py-5">{{ item.booking_date }}</td>
                  <td class="py-5">
                    <BaseBtn
                      rounded
                      class="
                        border border-primary
                        text-white
                        bg-pink-900
                        hover:bg-primary hover:text-white
                      "
                    >
                      Delete
                    </BaseBtn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="dataTable-bottom">
            <div class="dataTable-info">Showing 1 to 8 of 8 entries</div>
            <nav class="dataTable-pagination">
              <ul class="dataTable-pagination-list"></ul>
            </nav>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>