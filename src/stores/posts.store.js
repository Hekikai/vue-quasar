import { defineStore } from 'pinia'
import postsService from 'src/services/posts.service'
import usersService from 'src/services/users.service'

const usePostsStore = defineStore({
  id: 'postsStore',

  state: () => ({
    posts: [],
    users: [],
  }),

  actions: {
    async loadPostsAndUsers() {
      return Promise.all([postsService.fetchPosts(), usersService.fetchUsers()]).then(
        ([posts, users]) => {
          this.posts = posts
          this.users = users
        }
      )
    },

    getPostById(postId) {
      return this.postsWithUsernames.find((post) => post.id === parseInt(postId, 10))
    },
  },

  getters: {
    postsWithUsernames(state) {
      return state.posts.map((post) => ({
        ...post,
        username: state.users.find((user) => user.id === post.userId)?.username,
      }))
    },
  },
})

export default usePostsStore
