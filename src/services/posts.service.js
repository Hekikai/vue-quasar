import BaseService from "src/services/base.service";

class PostsService extends BaseService {
  fetchPosts() {
    return fetch(`${ this.PATH }/posts`).then(res => res.json());
  }

  fetchPostById(id) {
    return fetch(`${this.PATH}/posts/${id}`).then(res => res.json());
  }
}

export default new PostsService();
