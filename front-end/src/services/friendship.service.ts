import http from "../http-common.ts";
import IFriendshipData from "../types/friendship.type.ts";

class FriendshipDataService {
  create(data: IFriendshipData) {
    return http.post<IFriendshipData>("/friendships", data);
  }

  find(user_id: string) {
    return http.get<IFriendshipData[]>(`/friendships/${user_id}`);
  }

  remove(data: { user_id: string, target_id: string }) {
    return http.delete<any>("/friendships", { data });
  }
}

export default new FriendshipDataService();
