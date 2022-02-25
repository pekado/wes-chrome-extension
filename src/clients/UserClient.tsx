import { User, UserToken } from "../models/User";
import BaseClient from "./BaseClient";

class UserClient extends BaseClient {
  /**
   * Login to get access token
   *
   * @param username
   * @param password
   * @returns User
   */
  login = (username: string, password: string): Promise<UserToken> => {
    return this.post("/login", { username, password });
  }

  /**
   * get the current user
   * @returns User
   */
  getCurrentUser = (): Promise<User> => {
    return this.get("/me");
  }

}

export default UserClient;
