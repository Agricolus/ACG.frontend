import CONFIGURATION from '@/config';
import BaseRestService from '@/services/base';
import { IUserInfo, userActions, userStore } from './store';

class UserService extends BaseRestService {
  private baseEndpointsUrl: string;

  /**
   *
   */
  constructor() {
    super();
    this.baseEndpointsUrl = CONFIGURATION.auth!.authenticationServerUrl;
  }


  async getUserInfo() {
    const user = await this.get<IUserInfo>(`${this.baseEndpointsUrl}/user`);
    if (user)
      userStore.dispatch(userActions.setUser, user);
  }
}

export const userService = new UserService();