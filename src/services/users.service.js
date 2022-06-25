import BaseService from "src/services/base.service";

class UsersService extends BaseService {
  fetchUsers() {
    return fetch(`${this.PATH}/users`).then((res) => res.json());
  }
}

export default new UsersService();
