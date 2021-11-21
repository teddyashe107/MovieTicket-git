<script setup>
const props = defineProps({
    block: Boolean,
    to: String,
    xl: Boolean,
    icon: Boolean,
    rounded: Boolean,
    icon: Boolean
})
</script>
<template>
  <router-link
    class="btn rounded font-normal leading-4 ripple"
    :to="props.to"
    :class="[
      props.block ? 'block w-full' : 'inline-block',

      props.xl ? 'xl' : '',
      props.rounded ? 'rounded-full' : '',
      props.icon ? 'p-2 flex items-center justify-center' : 'py-2 px-5',
    ]"
  >
    <slot />
  </router-link>
</template>
<style lang="scss" scoped>
// loop colors

.btn {
  font-size: 0.813rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;

  &.ripple {
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
  }
  &.sm {
    font-size: 0.71137rem;
    @apply py-1 px-3;
  }
  &.xl {
    font-size: 1.18rem;
    padding: 0.75rem 2rem;
  }
}
</style>
