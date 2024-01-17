import http from "../http-common.ts";
import IUserData from "../types/user.type.ts"

class UserDataService {
  get(username: string) {
    return http.get<IUserData>(`/users/${username}`);
  }

  create(data: IUserData) {
    return http.post<IUserData>("/users", data);
  }

  delete(username: string) {
    return http.delete<any>(`/users/${username}`);
  }

  deleteAll() {
    return http.delete<any>(`/users`);
  }
}

export default new UserDataService();