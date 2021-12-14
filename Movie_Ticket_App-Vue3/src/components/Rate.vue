<template>
  <!-- Reviews -->
  <section aria-labelledby="information-heading" class="mt-2">
    <h3 id="information-heading" class="sr-only">Product information</h3>

    <p class="text-2xl text-gray-900">
      {{ props.price }}
    </p>

    <div class="mt-6">
      <h4 class="sr-only">Reviews</h4>
      <div class="flex items-center">
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
        <p class="sr-only">{{ product.rating }} out of 5 stars</p>
        <a
          href="#"
          class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >{{ product.reviewCount }} reviews</a
        >
      </div>
    </div>
  </section>
</template>