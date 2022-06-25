<template>
  <div class="column justify-center items-center">
    <q-spinner
      v-if="!isPostLoaded"
      color="primary"
      size="3em"
    />
    <q-card v-else dark bordered class="my-card">
      <q-card-section>
        <div class="text-h6">{{ postWithUsername.title }}</div>
        <div class="text-subtitle2">by {{ postWithUsername.username }}</div>
      </q-card-section>

      <q-separator dark inset/>

      <q-card-section>
        Post id: {{ postWithUsername.postId }}
      </q-card-section>
      <q-card-section>
        Post body: {{ postWithUsername.body }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
import usePostsStore from "stores/posts.store";
import { storeToRefs } from "pinia";

const route = useRoute();
const store = usePostsStore();
const { postWithUsername } = storeToRefs(store);
const isPostLoaded = ref(false);

store.loadPostById(route.params.id).then(() => isPostLoaded.value = true);
</script>

<style scoped lang="scss">

.column {
  min-height: calc(100vh - 50px);

  .my-card {
    max-width: 50%;
  }
}

</style>
