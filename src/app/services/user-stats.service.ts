import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';
import { ThisReceiver } from '@angular/compiler';

const httpOptions = {
  headers : new HttpHeaders({
    "Authorization": environment.access_token
  })
}



@Injectable({
  providedIn: 'root'
})
export class UserStatsService {

  followersList = new BehaviorSubject<any>([]);
  followingList = new BehaviorSubject<any>([]);
  reposCount = new BehaviorSubject<any>(0);
  reposList = new BehaviorSubject<any>([]);
  userInfo = new BehaviorSubject<any>({})

  constructor(private httpclient: HttpClient) { }

  promise:Promise<any> = new Promise(function(resolve, reject) { 
    const x = "Favour"; 
    const y = "Vivian"
    // if(x == y) { 
    //   resolve(); 
    // } else { 
    //   reject(); 
    // } 
    }). 
    then(function () { 
      console.log('Success, You are Favour'); 
    }). 
    catch(function () { 
      console.log('Some error has occured'); 
    });

  retrieveRepos(repos_url:string){
    if(repos_url != "" && repos_url != undefined){
      this.httpclient.get(repos_url, httpOptions).subscribe((response :any) => {
          this.reposList.next(response)
      })
    }
  }

  retrieveFollowers(followers_url:string){
    if(followers_url != "" && followers_url != undefined){
      this.httpclient.get(followers_url, httpOptions).subscribe((response :any) => {
          this.followersList.next(response)
      })
    }
  }

  retrieveFollowing(following_url:string){
    if(following_url != "" && following_url != undefined){
      if(following_url.endsWith("{/other_user}")){
        let indexOfError = following_url.indexOf("{/other_user}");
        following_url = following_url.slice(0, indexOfError);
        console.log("The following url " + following_url)
      }
      this.httpclient.get(following_url, httpOptions).subscribe((response :any) => {
        
        this.followingList.next(response)
      })
    }
  }

  retrieveUserInfo (api_url:string){
    this.httpclient.get(api_url, httpOptions).subscribe((response :any) => {
      this.userInfo.next(response);
    })
  }

  getFollowers(){
    return this.followersList.asObservable()
  }

  getFollowing(){
    return this.followingList.asObservable()
  }

  getUserInfo (){
    return this.userInfo.asObservable()
  }

  getReposList (){
    return this.reposList.asObservable()
  }

}
