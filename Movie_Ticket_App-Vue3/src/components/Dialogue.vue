<script setup>
import {ref} from'vue'
import {
  Dialog,
  DialogOverlay,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { XIcon } from '@heroicons/vue/outline'
import { StarIcon } from '@heroicons/vue/solid'
const props = defineProps({
  thumbnail: String,
  name: String,
  price: String
})
const product = {
  name: 'Basic Tee 6-Pack ',
  price: '$192',
  rating: 1,
  reviewCount: 117,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
  imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: true },
    { name: 'XXXL', inStock: false },
  ],
}

const open = ref(false)
    function openModal () {
      open.value = true
    }
  
    const selectedColor = ref(product.colors[0])
    const selectedSize = ref(product.sizes[2])
</script>

<template >
  <button type="button" @click="openModal">
    <slot name="DialogueButton"> </slot>
  </button>

  <TransitionRoot as="template" :show="open">
    <Dialog
      as="div"
      class="fixed z-10 inset-0 overflow-y-auto"
      @close="open = false"
    >
      <div
        class="flex min-h-screen text-center md:block md:px-2 lg:px-4"
        style="font-size: 0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="
              hidden
              fixed
              inset-0
              bg-gray-500 bg-opacity-75
              transition-opacity
              md:block
            "
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden md:inline-block md:align-middle md:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          enter-to="opacity-100 translate-y-0 md:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 md:scale-100"
          leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
        >
          <div
            class="
              flex
              text-base text-left
              transform
              transition
              w-full
              md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle
              lg:max-w-4xl
            "
          >
            <div
              class="
                w-full
                relative
                flex
                items-center
                bg-white
                px-4
                pt-14
                pb-8
                overflow-hidden
                shadow-2xl
                sm:px-6 sm:pt-8
                md:p-6
                lg:p-8
              "
            >
              <button
                type="button"
                class="
                  absolute
                  top-4
                  right-4
                  text-gray-400
                  hover:text-gray-500
                  sm:top-8 sm:right-6
                  md:top-6 md:right-6
                  lg:top-8 lg:right-8
                "
                @click="open = false"
              >
                <span class="sr-only">Close</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <div
                class="
                  w-full
                  grid grid-cols-1
                  gap-y-8 gap-x-6
                  items-start
                  sm:grid-cols-12
                  lg:gap-x-8
                "
              >
                <div
                  class="
                    aspect-w-2 aspect-h-3
                    rounded-lg
                    bg-gray-100
                    overflow-hidden
                    sm:col-span-4
                    lg:col-span-5
                  "
                >
                  <img
                    :src="props.thumbnail"
                    :alt="product.imageAlt"
                    class="object-center object-cover"
                  />
                </div>
                <div class="sm:col-span-8 lg:col-span-7">
                  <h2 class="text-2xl font-extrabold text-gray-900 sm:pr-12">
                    {{ props.name }}
                  </h2>

                  <slot name="Main"> </slot>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


