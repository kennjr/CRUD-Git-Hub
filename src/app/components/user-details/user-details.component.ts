import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserStatsService } from 'src/app/services/user-stats.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  api_url!:string;
  user!:any;
  reposList :any[] = []
  followersList :any[] = []
  followingList :any[] = []

  userInfoSubscription! :Subscription;
  followersSubscription! :Subscription;
  followingSubscription! :Subscription;
  reposSubscription! :Subscription;

  currentlyVisibleList = "Repos";

  constructor(private route: ActivatedRoute, private userstaservice: UserStatsService) { }


  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
    this.followersSubscription.unsubscribe();
    this.followingSubscription.unsubscribe();
    this.reposSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.api_url = this.route.snapshot.paramMap.get('api_url')!;
    this.userstaservice.retrieveUserInfo(this.api_url);
    this.getInfo()

    this.getReposList()
    this.getFollowersList()
    this.getFollowingList ()
  }

  getInfo (){
    this.userInfoSubscription = this.userstaservice.getUserInfo().subscribe((response) => {
      this.user = response;
      this.userstaservice.retrieveRepos(response.repos_url)
      this.userstaservice.retrieveFollowers(response.followers_url)
      
      this.userstaservice.retrieveFollowing(response.following_url)
    })
  }

  getReposList (){
    this.userstaservice.getReposList().subscribe((response) => {
      this.reposList = response;
    })
  }

  getFollowersList (){
    this.userstaservice.getFollowers().subscribe((response) => {
      this.followersList = response;
    })
  }

  getFollowingList (){
    this.userstaservice.getFollowing().subscribe((response) => {
      this.followingList = response;
    })
  }

  changeVisibleList(str :string){
    if(str != "" && this.currentlyVisibleList !== str){
      this.currentlyVisibleList = str;
    }
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
