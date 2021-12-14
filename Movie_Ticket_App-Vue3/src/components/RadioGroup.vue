<template>
  <section aria-labelledby="options-heading" class="mt-10">
    <h3 id="options-heading" class="sr-only">Product options</h3>

    <form>
      <!-- Colors -->
      <div>
        <h4 class="text-sm text-gray-900 font-medium">Color</h4>

        <RadioGroup v-model="selectedColor" class="mt-4">
          <RadioGroupLabel class="sr-only"> Choose a color </RadioGroupLabel>
          <div class="flex items-center space-x-3">
            <RadioGroupOption
              as="template"
              v-for="color in product.colors"
              :key="color.name"
              :value="color"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  color.selectedClass,
                  active && checked ? 'ring ring-offset-1' : '',
                  !active && checked ? 'ring-2' : '',
                  '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none',
                ]"
              >
                <RadioGroupLabel as="p" class="sr-only"> </RadioGroupLabel>
                <span
                  aria-hidden="true"
                  :class="[
                    color.class,
                    'h-8 w-8 border border-black border-opacity-10 rounded-full',
                  ]"
                ></span>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>

      <!-- Sizes -->
      <div class="mt-10">
        <div class="flex items-center justify-between">
          <h4 class="text-sm text-gray-900 font-medium">Size</h4>
          <a
            href="#"
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >Size guide</a
          >
        </div>

        <RadioGroup v-model="selectedSize" class="mt-4">
          <RadioGroupLabel class="sr-only"> Choose a size </RadioGroupLabel>
          <div class="grid grid-cols-4 gap-4">
            <RadioGroupOption
              as="template"
              v-for="size in product.sizes"
              :key="size.name"
              :value="size"
              :disabled="!size.inStock"
              v-slot="{ active, checked }"
            >
              <div
                :class="[
                  size.inStock
                    ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                    : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                  active ? 'ring-2 ring-indigo-500' : '',
                  'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1',
                ]"
              >
                <RadioGroupLabel as="p">
                  {{ size.name }}
                </RadioGroupLabel>
                <div
                  v-if="size.inStock"
                  :class="[
                    active ? 'border' : 'border-2',
                    checked ? 'border-indigo-500' : 'border-transparent',
                    'absolute -inset-px rounded-md pointer-events-none',
                  ]"
                  aria-hidden="true"
                />
                <div
                  v-else
                  aria-hidden="true"
                  class="
                    absolute
                    -inset-px
                    rounded-md
                    border-2 border-gray-200
                    pointer-events-none
                  "
                >
                  <svg
                    class="
                      absolute
                      inset-0
                      w-full
                      h-full
                      text-gray-200
                      stroke-2
                    "
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    stroke="currentColor"
                  >
                    <line
                      x1="0"
                      y1="100"
                      x2="100"
                      y2="0"
                      vector-effect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
            </RadioGroupOption>
          </div>
        </RadioGroup>
      </div>

      <button
        type="submit"
        class="
          mt-6
          w-full
          bg-indigo-600
          border border-transparent
          rounded-md
          py-3
          px-8
          flex
          items-center
          justify-center
          text-base
          font-medium
          text-white
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
        "
      >
        Book Ticket
      </button>
    </form>
  </section>
</template>