<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title @click="$router.push({ path: '/' })" style="cursor: pointer">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="Avatar Logo" />
          </q-avatar>
          Users and Their Posts
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-if="isReady" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import usePostsStore from 'stores/posts.store'

const store = usePostsStore()

const isReady = ref(false)

store.loadPostsAndUsers().then(() => (isReady.value = true))
</script>
