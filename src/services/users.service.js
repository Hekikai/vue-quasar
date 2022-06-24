import BaseService from "src/services/base.service";

class UsersService extends BaseService {
  getUsernameById(userId) {
    return fetch(`${ this.PATH }/users/${ userId }`).then(res => res.json()).then(data => data.name);
  }
}

export default new UsersService();
