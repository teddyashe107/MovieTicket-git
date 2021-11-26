<script setup>
const props = defineProps({
    PageTitle: String
})
</script>

<template>
  <div
    class="
      breadcrumb
      flex
      items-end
      border-b border-gray-300
      pb-4
      mb-5
      shadow-sm
    "
  >
    <p
      class="
        text-2xl
        font-semibold
        pl-4
        text-pink-600
        pr-5
        border-r border-gray-300
        mr-6
      "
    >
      {{ props.PageTitle }}
    </p>

    <ul>
      <li>
        <a
          href="#"
          class="
            hover:bg-pink-100 hover:text-gray-800
            text-pink-600
            rounded-sm
            px-6
            text-lg
          "
        >
          {{ props.PageTitle }}
        </a>
      </li>
    </ul>
  </div>
</template>