<template>
  <div class="q-gutter-md">
    <q-btn
      color="secondary"
      @click="$emit('handleSwitchView')"
    >
      {{ isGridView
      ? 'Switch to the table view'
      : 'Switch to the grid view'}}
    </q-btn>
  </div>
</template>

<script setup>

const props = defineProps({
  isGridView: {
    required: true,
    type: Boolean
  }
})

const emits = defineEmits(['handleSwitchView'])

</script>

<style scoped>

</style>
