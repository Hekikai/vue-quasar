<template>
  <div class="q-pa-md">
    <q-table
      :grid="isGridView ? 'grid' : false"
      style="height: auto"
      title="Posts"
      :rows="store.getPostsByUsername"
      :columns="columns"
      row-key="index"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      @update:pagination="handlePagination"
      @row-click="handleRowClick"
    >
      <template v-slot:top-right>
        <div class="q-gutter-y-xs">
          Average title length on this page:
          <p>
            {{ averageTitleLength }}
          </p>
          <the-button
            @handleSwitchView="isGridView = !isGridView"
            :is-grid-view="isGridView"
          />
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import TheButton from '../components/TheButton.vue';
import usePostsStore from "stores/posts.store";
import { useRoute, useRouter } from "vue-router";

const store = usePostsStore();
const router = useRouter();
const route = useRoute();

const isGridView = ref(false);

const pagination = ref({
  rowsPerPage: 10,
  page: 1
});

const handlePagination = (newPaginationObject) => {
  pagination.value.page = newPaginationObject.page;
}

const handleRowClick = (_, row) => {
  router.push({ path: `${ route.path }${ row.postId }` })
}

const averageTitleLength = computed(() => {
  const lowerBorder = pagination.value.rowsPerPage * (pagination.value.page - 1);
  const upperBorder = pagination.value.rowsPerPage * (pagination.value.page) - 1;

  let allTitlesLength = 0;

  store.getPostsByGap(lowerBorder, upperBorder).forEach((post) => {
    allTitlesLength += post.title.length;
  })

  return allTitlesLength / pagination.value.rowsPerPage;

});

const columns = [
  {
    name: 'username',
    label: 'Username',
    field: 'username'
  },
  {
    name: 'postId',
    label: 'Post Id',
    field: 'postId'
  },
  {
    name: 'title',
    label: 'Title',
    field: 'title'
  },
  {
    name: 'body',
    label: 'Body',
    field: 'body'
  }
]

onMounted(() => {
    store.loadPostsAndUsername();
  }
);
</script>

<style scoped>

</style>
