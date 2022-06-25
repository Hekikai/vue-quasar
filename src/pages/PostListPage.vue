<template>
  <div class="q-pa-md">
    <q-table
      :grid="isGridView ? 'grid' : false"
      style="height: auto"
      title="Posts"
      :rows="store.postsWithUsernames"
      :columns="columns"
      row-key="index"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      @row-click="handleRowClick"
    >
      <template v-slot:top-right>
        <div class="q-gutter-y-xs">
          Average title length on this page:
          <p>
            {{ averageTitleLength }}
          </p>
          <the-button @handleSwitchView="isGridView = !isGridView" :is-grid-view="isGridView" />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import TheButton from '../components/TheButton.vue'
import usePostsStore from 'stores/posts.store'
import { useRoute, useRouter } from 'vue-router'

const store = usePostsStore()
const router = useRouter()
const route = useRoute()

const isGridView = ref(false)

const pagination = ref({
  rowsPerPage: 23,
  page: 1,
})

const handleRowClick = (_, row) => {
  router.push({ path: `${route.path}${row.id}` })
}

const averageTitleLength = computed(() => {
  const start = pagination.value.rowsPerPage * (pagination.value.page - 1)
  const end = pagination.value.rowsPerPage * pagination.value.page

  const posts = store.posts.slice(start, end)

  const allTitlesLength = posts.reduce((acc, post) => (acc += post.title.length), 0)

  return allTitlesLength / posts.length
})

const columns = [
  {
    name: 'username',
    label: 'Username',
    field: 'username',
  },
  {
    name: 'postId',
    label: 'Post Id',
    field: 'postId',
  },
  {
    name: 'title',
    label: 'Title',
    field: 'title',
  },
  {
    name: 'body',
    label: 'Body',
    field: 'body',
  },
]
</script>

<style scoped></style>
