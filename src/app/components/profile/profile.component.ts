import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  current_user:any
  current_user_data:any
  gh_username = "sharonkorir"
  gh_userDataSub!: Subscription;

  constructor(private searchsearvice: SearchService) { }

  ngOnInit(): void {

    if (this.gh_username != ""){
      this.searchsearvice.getCurrentUserData(this.gh_username);
      this.getCurrentUserData();
    }
  }

  ngOnDestroy() :void{
    this.gh_userDataSub.unsubscribe();
  }

  getCurrentUserData(){
    this.gh_userDataSub = this.searchsearvice.currentUserData.subscribe((response : any) => {
      this.current_user_data = response;
      console.log("The response for the ", response)
    })
  }

  openInGithub(){
    window.open(this.current_user_data.html_url, "_blank")
  }

}
