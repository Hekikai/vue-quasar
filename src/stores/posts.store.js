import { defineStore } from "pinia";
import postsService from "src/services/posts.service";
import usersService from "src/services/users.service";

const usePostsStore = defineStore({
  id: 'postsStore',
  state: () => ({
    tableRows: [],
    postWithUsername: {},
    idToUsername: new Map()
  }),
  actions: {
    async loadPostsAndUsername() {
      const posts = await postsService.fetchPosts();
      this.tableRows = await Promise.all(posts.map(async(post) => {
        const username = await usersService.getUsernameById(post.userId);

        if (!this.idToUsername.has(post.userId)) {
          this.idToUsername.set(post.userId, username);
        }

        return {
          username,
          title: post.title,
          body: post.body,
          postId: post.id,
        }
      }));
    },
    async loadPostById(id) {
      const post = await postsService.fetchPostById(id);

      this.postWithUsername = {
        username: this.idToUsername.get(post.userId),
        title: post.title,
        body: post.body,
        postId: post.id
      }
    }
  },
  getters: {
    getPostByUsername(state) {
      return state.postWithUsername;
    },
    getPostsByGap() {
      return (lhs, rhs) => this.getPostsByUsername.slice(lhs, rhs + 1);
    },
    getPostsByUsername(state) {
      return state.tableRows;
    }
  }
})

export default usePostsStore;
