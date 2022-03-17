import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/User';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

    let testUser:User = {
      html_url:value.html_url,
      avatar_url:value.avatar_url,
      username:value.login,
      followers_url:value.followers_url,
      following_url:value.following_url,
      repos_url:value.repos_url,
      api_url:value.url
    }

    return testUser;
  }

}
