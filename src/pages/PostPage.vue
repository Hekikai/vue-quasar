<template>
  <div class="column justify-center items-center">
    <q-card v-if="post" dark bordered class="my-card">
      <q-card-section>
        <div class="text-h6">{{ post.title }}</div>
        <div class="text-subtitle2">by {{ post.username }}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section> Post id: {{ post.id }} </q-card-section>
      <q-card-section> Post body: {{ post.body }} </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import usePostsStore from 'stores/posts.store'

const route = useRoute()
const store = usePostsStore()

const post = store.getPostById(route.params.id)
</script>

<style scoped lang="scss">
.column {
  min-height: calc(100vh - 50px);

  .my-card {
    max-width: 50%;
  }
}
</style>
