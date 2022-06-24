import { defineStore } from "pinia";
import postsService from "src/services/posts.service";
import usersService from "src/services/users.service";

const usePostsStore = defineStore({
  id: 'postsStore',
  state: () => ({
    postsByUsername: new Map(),
    postsByUserId: new Map(),
    uniqueUserIds: new Set(),
    tableRows: [],
    postWithUsername: {},
  }),
  actions: {
    loadPostsAndUsername() {
      if(this.postsByUserId.size !== 0) {
        return false;
      }
      postsService.fetchPosts()
        .then(data => {
          data.forEach((post) => {
            const posts = this.postsByUserId.get(post.userId);

            if (!this.uniqueUserIds.has(post.userId)) {
              this.uniqueUserIds.add(post.userId);
            }

            if (posts) {
              this.postsByUserId.get(post.userId).push(post);
            } else {
              this.postsByUserId.set(post.userId, [post]);
            }
          })
        })
        .then(() => {
          this.uniqueUserIds.forEach(async(id) => {
            this.postsByUsername.set(await usersService.getUsernameById(id), this.postsByUserId.get(id))
          })
        })
    },
    loadPostById(id) {
      return postsService.fetchPostById(id)
        .then(post => {
          this.postWithUsername = post;
        }).then(async () => {
          const userId = this.postWithUsername.userId
          this.postWithUsername.username = await usersService.getUsernameById(userId);
      })
    }
  },
  getters: {
    getPostsByUsername(state) {
      const rowsToReturn = [];
      state.postsByUsername.forEach((posts, username) => {
        posts.forEach((post) => {
          const dto = {
            username,
            title: post.title,
            body: post.body,
            postId: post.id
          }
          rowsToReturn.push(dto);
        })
      })
      return rowsToReturn;
    },
    getPostsByGap() {
      return (lhs, rhs) => this.getPostsByUsername.slice(lhs, rhs + 1);
    }
  }
})

export default usePostsStore;
