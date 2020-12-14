import BaseRestService from '@/services/base';
import { IUserInfo, userActions, userStore } from './store';

class UserService extends BaseRestService {
  private baseEndpointsUrl: string;

  /**
   *
   */
  constructor() {
    super();
    this.baseEndpointsUrl = "http://dockerdev.agricolus.com:3000";
  }


  async getUserInfo() {
    const user = await this.get<IUserInfo>(`${this.baseEndpointsUrl}/user`);
    if (user)
      userStore.dispatch(userActions.setUser, user);
  }
}

export const userService = new UserService();